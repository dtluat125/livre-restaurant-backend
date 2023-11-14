import { TableStatus } from './../../table-diagram/tableDiagram.constant';
import { BookingStatus } from './../booking.constant';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { TIMEZONE_NAME_DEFAULT } from 'src/common/constants';
import { createWinstonLogger } from 'src/common/services/winston.service';
import { getManager } from 'typeorm';
import moment from 'moment';
import * as dotenv from 'dotenv';
import { Booking } from '../entity/booking.entity';
import { MODULE_NAME } from '../booking.constant';
import { TablesRestaurant } from 'src/modules/table-diagram/entity/tablesRestaurant.entity';
dotenv.config();

const CRON_JOB_BOOKING_UPDATE_STATUS =
    process.env.CRON_JOB_BOOKING_UPDATE_STATUS || '* * * * *';

//Change contract status from active to inactive if this contract outdate
@Injectable()
export class UpdateBookingStatusJob {
    constructor(private readonly configService: ConfigService) {
        // eslint-disable-next-line prettier/prettier
    }
    private readonly logger = createWinstonLogger(
        `${MODULE_NAME}-update-status-job`,
        this.configService,
    );

    idTableWaitings: number[] = [];

    async cancelBooking() {
        try {
            const today = moment().toDate();
            const manager = getManager();
            await manager
                .createQueryBuilder()
                .update(Booking)
                .set({ status: BookingStatus.CANCELED })
                .where('arrivalTime < :today AND status = :status', {
                    today,
                    status: BookingStatus.WAITING,
                })
                .execute();

            const bookingWaiting = await manager.find(Booking, {
                select: ['tableId'],
                where: {
                    status: BookingStatus.WAITING,
                },
            });
            this.idTableWaitings = bookingWaiting.map((element) => {
                return element.tableId;
            });
            if (this.idTableWaitings?.length) {
                await manager
                    .createQueryBuilder()
                    .update(TablesRestaurant)
                    .set({ status: TableStatus.READY })
                    .where(
                        'status= :status  AND id NOT IN (:idTableWaitings)',
                        {
                            status: TableStatus.BOOKED,
                            idTableWaitings: this.idTableWaitings,
                        },
                    )
                    .execute();
            } else {
                await manager
                    .createQueryBuilder()
                    .update(TablesRestaurant)
                    .set({ status: TableStatus.READY })
                    .where('status= :status', {
                        status: TableStatus.BOOKED,
                    })
                    .execute();
            }
        } catch (error) {
            this.logger.error('Error in cancelBooking func: ', error);
        }
    }

    @Cron(CRON_JOB_BOOKING_UPDATE_STATUS, {
        timeZone: TIMEZONE_NAME_DEFAULT,
    })
    async handleCron() {
        try {
            this.logger.info('start UpdateBookingStatusJob at', new Date());
            this.cancelBooking();
        } catch (error) {
            this.logger.error('Error in UpdateBookingStatusJob: ', error);
        }
    }
}
