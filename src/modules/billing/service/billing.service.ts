import {
    Injectable,
    Optional,
    Inject,
    InternalServerErrorException,
} from '@nestjs/common';
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
    BillingQueryStringDto,
    BillingDetailResponseDto,
    CreateBillingDto,
    UpdateBillingDto,
} from '../dto/billing.dto';
import { Billing } from '../entity/billing.entity';

const BillingAttribute: (keyof Billing)[] = [
    'id',
    'customerName',
    'customerPhone',
    'tableId',
    'cashierId',
    'paymentTotal',
    'paymentMethod',
    'paymentTime',
    'arrivalTime',
    'billingStatus',
    'reasonCanceled',
    'note',
    'createdAt',
    'updatedAt',
];

@Injectable()
export class BillingService {
    constructor(
        @Optional() @Inject(REQUEST) private readonly request: Request,
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
    ) {}

    generateQueryBuilder(queryBuilder, { keyword, paymentTimeRange }) {
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
        if (paymentTimeRange.length === 2) {
            queryBuilder.andWhere(
                new Brackets((qb) => {
                    qb.where(
                        'billing.paymentTime BETWEEN :startDay AND :endDay',
                        {
                            startDay: paymentTimeRange[0],
                            endDay: paymentTimeRange[1],
                        },
                    );
                }),
            );
        }
    }

    async getBillingList(query: BillingQueryStringDto) {
        try {
            const {
                keyword = '',
                page = DEFAULT_FIRST_PAGE,
                limit = DEFAULT_LIMIT_FOR_PAGINATION,
                orderBy = DEFAULT_ORDER_BY,
                orderDirection = ORDER_DIRECTION.ASC,
                paymentTimeRange = [],
            } = query;
            const take = +limit || DEFAULT_LIMIT_FOR_PAGINATION;
            const skip = (+page - 1) * take || 0;
            const [items, totalItems] = await this.dbManager.findAndCount(
                Billing,
                {
                    select: BillingAttribute,
                    where: (queryBuilder) =>
                        this.generateQueryBuilder(queryBuilder, {
                            keyword,
                            paymentTimeRange,
                        }),
                    order: {
                        [orderBy]: orderDirection.toUpperCase(),
                    },
                    relations: ['table', 'cashier'],
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

    async getBillingDetail(id: number): Promise<BillingDetailResponseDto> {
        try {
            const billing = await this.dbManager.findOne(Billing, {
                select: BillingAttribute,
                where: { id },
                relations: ['table', 'cashier'],
            });
            return billing;
        } catch (error) {
            throw error;
        }
    }

    async createBilling(
        billing: CreateBillingDto,
    ): Promise<BillingDetailResponseDto> {
        try {
            const insertedMaterial = await this.dbManager
                .getRepository(Billing)
                .insert(billing);
            const billingId = insertedMaterial?.identifiers[0]?.id;
            if (billingId) {
                const billingDetail = await this.getBillingDetail(billingId);
                return billingDetail;
            }
            throw new InternalServerErrorException();
        } catch (error) {
            throw error;
        }
    }

    async updateBillingStatus(id: number, updateBilling: UpdateBillingDto) {
        try {
            await this.dbManager.update(Billing, id, updateBilling);

            const savedMaterial = await this.getBillingDetail(id);
            return savedMaterial;
        } catch (error) {
            throw error;
        }
    }
}
