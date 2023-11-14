import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
    DEFAULT_FIRST_PAGE,
    DEFAULT_LIMIT_FOR_PAGINATION,
    DEFAULT_ORDER_BY,
    DEFAULT_ORDER_DIRECTION,
} from 'src/common/constants';
import { Brackets, EntityManager, Like } from 'typeorm';
import {
    categoryDetailResponseDto,
    CategoryListQueryStringDto,
    CreateCategoryDto,
    UpdateCategoryDto,
} from '../dto/category.dto';
import { Category } from '../entity/category.entity';

const categoryAttributes: (keyof Category)[] = [
    'id',
    'name',
    'priority',
    'note',
    'createdAt',
];
@Injectable()
export class CategoryService {
    constructor(private readonly dbManager: EntityManager) {}

    generateQueryBuilder(queryBuilder, { keyword }) {
        if (keyword) {
            const likeKeyword = `%${keyword}%`;
            queryBuilder.andWhere(
                new Brackets((qb) => {
                    qb.where([
                        {
                            name: Like(likeKeyword),
                        },
                        {
                            description: Like(likeKeyword),
                        },
                    ]);
                }),
            );
        }
    }

    async getCategoryList(query: CategoryListQueryStringDto) {
        try {
            const {
                page = DEFAULT_FIRST_PAGE,
                limit = DEFAULT_LIMIT_FOR_PAGINATION,
                keyword = '',
                orderBy = DEFAULT_ORDER_BY,
                orderDirection = DEFAULT_ORDER_DIRECTION,
            } = query;

            // Pagination
            const take = +limit || DEFAULT_LIMIT_FOR_PAGINATION;
            const skip = (+page - 1) * take || 0;

            const [items, totalItems] = await this.dbManager.findAndCount(
                Category,
                {
                    select: categoryAttributes,
                    where: (queryBuilder) =>
                        this.generateQueryBuilder(queryBuilder, {
                            keyword,
                        }),
                    order: {
                        [orderBy]: orderDirection.toUpperCase(),
                    },
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

    async getCategoryDetail(id: number): Promise<categoryDetailResponseDto> {
        try {
            const category = await this.dbManager.findOne(Category, {
                select: categoryAttributes,
                where: { id },
            });
            return category;
        } catch (error) {
            throw error;
        }
    }

    async createCategory(category: CreateCategoryDto) {
        try {
            const insertedCategory = await this.dbManager
                .getRepository(Category)
                .insert(category);
            const categoryId = insertedCategory?.identifiers[0]?.id;
            if (categoryId) {
                const categoryDetail = await this.getCategoryDetail(categoryId);
                return categoryDetail;
            }
            throw new InternalServerErrorException();
        } catch (error) {
            throw error;
        }
    }

    async updateCategory(id: number, category: UpdateCategoryDto) {
        try {
            await this.dbManager
                .getRepository(Category)
                .update({ id }, category);
            const updatedCategory = await this.getCategoryDetail(id);
            return updatedCategory;
        } catch (error) {
            throw error;
        }
    }

    async deleteCategory(id: number, deletedBy: number) {
        try {
            await this.dbManager.update(
                Category,
                { id },
                {
                    deletedAt: new Date(),
                    deletedBy,
                },
            );
        } catch (error) {
            throw error;
        }
    }
}
