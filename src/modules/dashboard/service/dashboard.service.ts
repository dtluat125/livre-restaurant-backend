import { Inject, Injectable, Optional } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Request } from 'express';
import { IRevenueChartListQuery } from '../dashboard.interface';

import { makeFileUrl } from 'src/common/helpers/common.function';
import { FoodBilling } from 'src/modules/food-billing/entity/food-billing.entity';
import { Food } from 'src/modules/food/entity/food.entity';
import { ReportRevenue } from 'src/modules/report-revenue/entity/report_revenue.entity';
import { Brackets, EntityManager } from 'typeorm';
import { DateRangeTypes } from '../dashboard.constant';

@Injectable()
export class DashboardService {
    constructor(
        @Optional() @Inject(REQUEST) private readonly request: Request,
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
    ) {}

    generateRevenueChartQueryBuilder(
        queryBuilder,
        { dateRanges },
        isFoodBilling?: boolean,
    ) {
        if (dateRanges.length === 2) {
            queryBuilder.andWhere(
                new Brackets((qb) => {
                    qb.where(
                        `${
                            isFoodBilling ? 'paymentTime' : 'date'
                        } BETWEEN :startDay AND :endDay`,
                        {
                            startDay: dateRanges[0],
                            endDay: dateRanges[1],
                        },
                    );
                }),
            );
        }
    }

    async getFoodRevenue(query: IRevenueChartListQuery) {
        try {
            const { dateRanges = [], dateRangeType = DateRangeTypes.MONTH } =
                query;
            const foodBillings = await this.dbManager.find(FoodBilling, {
                where: (queryBuilder) =>
                    this.generateRevenueChartQueryBuilder(
                        queryBuilder,
                        {
                            dateRanges,
                        },
                        true,
                    ),

                relations: [
                    'food',
                    'billing',
                    'billing.table',
                    'food.category',
                    'food.foodImgFile',
                ],
            });

            const foodSales: {
                [key: string]: Food & { quantity: number; foodImg: any };
            } = {};

            foodBillings.forEach((foodBilling) => {
                const foodId = foodBilling.food.id?.toString();
                if (!foodId) return;
                foodSales[foodId] = {
                    ...foodBilling.food,
                    quantity:
                        (foodSales[foodId]?.quantity || 0) +
                        foodBilling.quantity,
                    foodImg: foodBilling.food?.foodImgFile
                        ? {
                              ...foodBilling.food?.foodImgFile,
                              url: makeFileUrl(
                                  foodBilling.food?.foodImgFile.fileName,
                              ),
                          }
                        : null,
                };
            });

            return { items: Object.values(foodSales) };
        } catch (error) {
            throw error;
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

            const revenueDate: {
                day: number;
                revenue: number;
            }[] = [];

            if (dateRangeType === DateRangeTypes.DAY) {
                for (let i = 0; i < 32; i++) {
                    revenueDate.push({
                        day: i,
                        revenue: 0,
                    });
                }
            }
            revenues?.forEach((revenue) => {
                if (dateRangeType === DateRangeTypes.MONTH) {
                    const month = revenue?.date.getMonth() + 1;
                    revenueMonth[month].revenue += revenue.billingRevenue;
                } else {
                    const day = revenue?.date.getDate();
                    revenueDate[day].revenue += revenue.billingRevenue;
                }
            });

            return dateRangeType === DateRangeTypes.MONTH
                ? {
                      items: revenueMonth,
                  }
                : {
                      items: revenueDate,
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
