import { AcceptStatus } from './../../common/common.constant';
import { ReportRevenue } from '../entity/report_revenue.entity';
import { SHIFT } from '../report_revenue.constant';
import { Billing } from 'src/modules/billing/entity/billing.entity';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import moment from 'moment';
import * as dotenv from 'dotenv';
import { TIMEZONE_NAME_DEFAULT } from 'src/common/constants';
import { createWinstonLogger } from 'src/common/services/winston.service';
import { Brackets, getManager } from 'typeorm';
import { MODULE_NAME } from '../report_revenue.constant';
import { BillingStatus } from 'src/modules/billing/billing.constant';

dotenv.config();

const CRON_JOB_CREATE_REPORT_REVENUE =
    process.env.CRON_JOB_CREATE_REPORT_REVENUE || '0 14,22 * * *';

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
            const now = moment(new Date()).utc();
            const manager = getManager();
            let shift;
            let startShift;
            let endShift;
            const dayShift = now.format('YYYY-MM-DD');
            if (now.hours() < 7) {
                shift = SHIFT.MORNING_SHIFT;
                startShift = `${dayShift} 09:00:00`;
                endShift = `${dayShift} 14:00:00`;
            } else {
                shift = SHIFT.AFTERNOON_SHIFT;
                startShift = `${dayShift} 14:00:00`;
                endShift = `${dayShift} 22:00:00`;
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

    @Cron(CRON_JOB_CREATE_REPORT_REVENUE, {
        timeZone: TIMEZONE_NAME_DEFAULT,
    })
    async handleCron() {
        try {
            this.logger.info('start CreateReportRevenueJob at', new Date());
            this.createReportRevenue();
        } catch (error) {
            this.logger.error('Error in CreateReportRevenueJob: ', error);
        }
    }
}
