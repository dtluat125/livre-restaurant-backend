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
import { EntityManager, Brackets, Like, getConnection } from 'typeorm';
import {
    FoodBillingQueryStringDto,
    FoodBillingDetailResponseDto,
    CreateFoodBillingDto,
    UpdateFoodBillingDto,
    CreateFoodBillingListDto,
} from '../dto/food-billing.dto';
import { FoodBilling } from '../entity/food-billing.entity';

const FoodBillingAttribute: (keyof FoodBilling)[] = [
    'id',
    'foodId',
    'food',
    'note',
    'quantity',
    'createdAt',
    'updatedAt',
];

@Injectable()
export class FoodBillingService {
    constructor(
        @Optional() @Inject(REQUEST) private readonly request: Request,
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
    ) {}

    generateQueryBuilder(queryBuilder, { keyword, billingId }) {
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

        if (billingId) {
            queryBuilder.andWhere({
                billingId,
            });
        }
    }

    async getFoodBillingList(query: FoodBillingQueryStringDto) {
        try {
            const {
                keyword = '',
                page = DEFAULT_FIRST_PAGE,
                limit = DEFAULT_LIMIT_FOR_PAGINATION,
                orderBy = DEFAULT_ORDER_BY,
                orderDirection = ORDER_DIRECTION.ASC,
                billingId = '',
            } = query;
            const take = +limit || DEFAULT_LIMIT_FOR_PAGINATION;
            const skip = (+page - 1) * take || 0;
            const [items, totalItems] = await this.dbManager.findAndCount(
                FoodBilling,
                {
                    select: FoodBillingAttribute,
                    where: (queryBuilder) =>
                        this.generateQueryBuilder(queryBuilder, {
                            keyword,
                            billingId,
                        }),
                    order: {
                        [orderBy]: orderDirection.toUpperCase(),
                    },
                    relations: [
                        'food',
                        'billing',
                        'billing.table',
                        'food.category',
                    ],
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

    async getFoodBillingDetail(
        id: number,
    ): Promise<FoodBillingDetailResponseDto> {
        try {
            const foodBilling = await this.dbManager.findOne(FoodBilling, {
                select: FoodBillingAttribute,
                where: { id },
            });
            return foodBilling;
        } catch (error) {
            throw error;
        }
    }

    async createFoodBillings(foodBillings: CreateFoodBillingListDto) {
        try {
            await getConnection()
                .createQueryBuilder()
                .insert()
                .into(FoodBilling)
                .values(foodBillings.foodList)
                .execute();
        } catch (error) {
            throw error;
        }
    }

    async updateFoodBillingStatus(
        id: number,
        updateFoodBilling: UpdateFoodBillingDto,
    ) {
        try {
            await this.dbManager.update(FoodBilling, id, updateFoodBilling);
            const savedMaterial = await this.getFoodBillingDetail(id);
            return savedMaterial;
        } catch (error) {
            throw error;
        }
    }
}
