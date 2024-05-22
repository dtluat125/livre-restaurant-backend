import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import * as dotenv from 'dotenv';
import moment from 'moment-timezone';
import { TIMEZONE_NAME_DEFAULT } from 'src/common/constants';
import { createWinstonLogger } from 'src/common/services/winston.service';
import { BillingStatus } from 'src/modules/billing/billing.constant';
import { Billing } from 'src/modules/billing/entity/billing.entity';
import { Brackets, getManager } from 'typeorm';
import { ReportRevenue } from '../entity/report_revenue.entity';
import { MODULE_NAME, SHIFT } from '../report_revenue.constant';
import { AcceptStatus } from './../../common/common.constant';

dotenv.config();

const CRON_JOB_CREATE_MORNING_SHIFT_REPORT_REVENUE =
    process.env.CRON_JOB_CREATE_REPORT_REVENUE || '0 14 * * *';
const CRON_JOB_CREATE_AFTERNOON_SHIFT_REPORT_REVENUE =
    process.env.CRON_JOB_CREATE_REPORT_REVENUE || '0 22 * * *';

// const CRON_JOB_CREATE_REPORT_REVENUE = '* * * * *';
//Change contract status from active to inactive if this contract outdate
@Injectable()
export class CreateReportRevenueJob {
    constructor(private readonly configService: ConfigService) {
        // eslint-disable-next-line prettier/prettier
    }
    private readonly logger = createWinstonLogger(
        `${MODULE_NAME}-create-report-revenue-job`,
        this.configService,
    );

    idTableWaitings: number[] = [];

    async createReportRevenue() {
        try {
            const now = moment(new Date()).tz(TIMEZONE_NAME_DEFAULT);
            const manager = getManager();
            let shift;
            let startShift;
            let endShift;
            const dayShift = now.format('YYYY-MM-DD');
            if (now.hours() <= 14) {
                shift = SHIFT.MORNING_SHIFT;
                startShift = moment
                    .tz(`${dayShift} 09:00:00`, TIMEZONE_NAME_DEFAULT)
                    ?.toDate();
                endShift = moment
                    .tz(`${dayShift} 14:00:00`, TIMEZONE_NAME_DEFAULT)
                    ?.toDate();
            } else {
                shift = SHIFT.AFTERNOON_SHIFT;
                startShift = moment
                    .tz(`${dayShift} 14:00:00`, TIMEZONE_NAME_DEFAULT)
                    ?.toDate();
                endShift = moment
                    .tz(`${dayShift} 22:00:00`, TIMEZONE_NAME_DEFAULT)
                    ?.toDate();
            }

            const [billings, billingCount] = await manager.findAndCount(
                Billing,
                {
                    select: ['paymentTotal'],
                    where: (queryBuilder) =>
                        this.generateQueryBuilder(queryBuilder, {
                            startShift,
                            endShift,
                        }),
                },
            );

            let totalPayment = 0;
            billings.forEach((element) => {
                totalPayment += element.paymentTotal;
            });

            const insertedReportRevenue = await manager.save(ReportRevenue, {
                date: dayShift,
                status: AcceptStatus.JUST_CREATE,
                billingCount,
                shift,
                billingRevenue: totalPayment,
            });

            if (!insertedReportRevenue) {
                this.createReportRevenue();
            }
        } catch (error) {
            this.logger.error('Error in CreateReportRevenueJob func: ', error);
        }
    }

    generateQueryBuilder(queryBuilder, { startShift, endShift }) {
        queryBuilder.andWhere(
            new Brackets((qb) => {
                qb.where('paymentTime BETWEEN :startShift AND :endShift', {
                    startShift,
                    endShift,
                });
            }),
        );
        queryBuilder.andWhere({
            billingStatus: BillingStatus.PAID,
        });
    }

    @Cron(CRON_JOB_CREATE_MORNING_SHIFT_REPORT_REVENUE, {
        timeZone: TIMEZONE_NAME_DEFAULT,
    })
    async handleCronCreateMorningShiftReportRevenue() {
        try {
            this.logger.info(
                'start CreateReportRevenueJob Morning Shift at',
                new Date(),
            );
            this.createReportRevenue();
        } catch (error) {
            this.logger.error(
                'Error in CreateReportRevenueJob Morning Shift: ',
                error,
            );
        }
    }

    @Cron(CRON_JOB_CREATE_AFTERNOON_SHIFT_REPORT_REVENUE, {
        timeZone: TIMEZONE_NAME_DEFAULT,
    })
    async handleCronCreateAfternoonShiftReportRevenue() {
        try {
            this.logger.info(
                'start CreateReportRevenueJob Afternoon Shift at',
                new Date(),
            );
            this.createReportRevenue();
        } catch (error) {
            this.logger.error(
                'Error in CreateReportRevenueJob Afternoon Shift: ',
                error,
            );
        }
    }
}
