import { Injectable, Optional, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
    DEFAULT_FIRST_PAGE,
    DEFAULT_LIMIT_FOR_PAGINATION,
    DEFAULT_ORDER_BY,
    ORDER_DIRECTION,
} from 'src/common/constants';
import { EntityManager, Brackets, Like } from 'typeorm';
import {
    ReportRevenueQueryStringDto,
    ReportRevenueDetailResponseDto,
    UpdateReportRevenueDto,
} from '../dto/report_revenue.dto';
import { ReportRevenue } from '../entity/report_revenue.entity';

const ReportRevenueAttribute: (keyof ReportRevenue)[] = [
    'id',
    'shift',
    'shiftLeaderId',
    'cashAtBeginningOfShift',
    'cashAtEndingOfShift',
    'bankingRevenue',
    'billingRevenue',
    'differenceRevenue',
    'note',
    'date',
    'status',
    'billingCount',
    'createdAt',
    'updatedAt',
];

@Injectable()
export class ReportRevenueService {
    constructor(
        @Optional() @Inject(REQUEST) private readonly request: Request,
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
    ) {}

    generateQueryBuilder(queryBuilder, { keyword, dateRange }) {
        if (keyword) {
            const likeKeyword = `%${keyword}%`;
            queryBuilder.andWhere(
                new Brackets((qb) => {
                    qb.where([
                        {
                            shiftLeaderId: Like(likeKeyword),
                        },
                    ]);
                }),
            );
        }

        if (dateRange.length === 2) {
            queryBuilder.andWhere(
                new Brackets((qb) => {
                    qb.where(
                        'reportRevenue.date BETWEEN :startDay AND :endDay',
                        {
                            startDay: dateRange[0],
                            endDay: dateRange[1],
                        },
                    );
                }),
            );
        }
    }

    async getReportRevenueList(query: ReportRevenueQueryStringDto) {
        try {
            const {
                keyword = '',
                page = DEFAULT_FIRST_PAGE,
                limit = DEFAULT_LIMIT_FOR_PAGINATION,
                orderBy = DEFAULT_ORDER_BY,
                orderDirection = ORDER_DIRECTION.ASC,
                dateRange = [],
            } = query;
            const take = +limit || DEFAULT_LIMIT_FOR_PAGINATION;
            const skip = (+page - 1) * take || 0;
            const [items, totalItems] = await this.dbManager.findAndCount(
                ReportRevenue,
                {
                    select: ReportRevenueAttribute,
                    where: (queryBuilder) =>
                        this.generateQueryBuilder(queryBuilder, {
                            keyword,
                            dateRange,
                        }),
                    order: {
                        [orderBy]: orderDirection.toUpperCase(),
                    },
                    relations: ['shiftLeader'],
                    take,
                    skip,
                },
            );
            return {
                items,
                totalItems,
            };
        } catch (error) {
            throw error;
        }
    }

    async getReportRevenueDetail(
        id: number,
    ): Promise<ReportRevenueDetailResponseDto> {
        try {
            const checkInventory = await this.dbManager.findOne(ReportRevenue, {
                select: ReportRevenueAttribute,
                where: { id },
            });
            return checkInventory;
        } catch (error) {
            throw error;
        }
    }

    async updateReportRevenueStatus(
        id: number,
        updateReportRevenue: UpdateReportRevenueDto,
    ) {
        try {
            await this.dbManager.update(ReportRevenue, id, updateReportRevenue);
            const savedMaterial = await this.getReportRevenueDetail(id);
            return savedMaterial;
        } catch (error) {
            throw error;
        }
    }
}
