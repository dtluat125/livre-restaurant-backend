import { IRevenueChartListQuery } from '../dashboard.interface';
import { Injectable, Optional, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectEntityManager } from '@nestjs/typeorm';

import { EntityManager, Brackets, Like } from 'typeorm';
import { DateRangeTypes } from '../dashboard.constant';
import { orderBy } from 'lodash';
import { take, skip } from 'rxjs';
import { ReportRevenue } from 'src/modules/report-revenue/entity/report_revenue.entity';
import { number } from 'joi';

@Injectable()
export class DashboardService {
    constructor(
        @Optional() @Inject(REQUEST) private readonly request: Request,
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
    ) {}

    generateRevenueChartQueryBuilder(queryBuilder, { dateRanges }) {
        if (dateRanges.length === 2) {
            queryBuilder.andWhere(
                new Brackets((qb) => {
                    qb.where('date BETWEEN :startDay AND :endDay', {
                        startDay: dateRanges[0],
                        endDay: dateRanges[1],
                    });
                }),
            );
        }
    }

    async getRevenues(query: IRevenueChartListQuery) {
        try {
            const { dateRanges = [], dateRangeType = DateRangeTypes.MONTH } =
                query;

            const revenues = await this.dbManager.find(ReportRevenue, {
                where: (queryBuilder) =>
                    this.generateRevenueChartQueryBuilder(queryBuilder, {
                        dateRanges,
                    }),
            });

            if (!revenues.length) {
                return {
                    items: [],
                };
            }

            const revenueMonth: {
                month: number;
                revenue: number;
            }[] = [];
            if (dateRangeType === DateRangeTypes.MONTH) {
                for (let i = 0; i < 14; i++) {
                    revenueMonth.push({
                        month: i,
                        revenue: 0,
                    });
                }
            }
            const userTimes = revenues?.map((revenue) => {
                if (dateRangeType === DateRangeTypes.MONTH) {
                    const month = revenue?.date.getMonth() + 1;
                    revenueMonth[month].revenue += revenue.billingRevenue;
                } else {
                    return {
                        day: revenue?.date.getDay(),
                        revenue: revenue.billingRevenue,
                    };
                }
            });

            return dateRangeType === DateRangeTypes.MONTH
                ? {
                      items: revenueMonth,
                  }
                : {
                      items: userTimes,
                  };
        } catch (error) {
            throw error;
        }
    }

    async getData(query: IRevenueChartListQuery) {
        try {
            const { dateRanges = [], dateRangeType = DateRangeTypes.MONTH } =
                query;

            const revenues = await this.dbManager.find(ReportRevenue, {
                where: (queryBuilder) =>
                    this.generateRevenueChartQueryBuilder(queryBuilder, {
                        dateRanges,
                    }),
            });
            let billingCount = 0;
            let revenueTotal = 0;
            if (revenues.length) {
                revenues.forEach((item) => {
                    billingCount += item.billingCount;
                    revenueTotal += item.billingRevenue;
                });
            }
            return {
                billingCount,
                revenueTotal,
            };
        } catch (error) {
            throw error;
        }
    }
}
