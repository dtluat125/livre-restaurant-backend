import { Category } from '../../category/entity/category.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Brackets, EntityManager, In, Not } from 'typeorm';
import { DEFAULT_LIMIT_FOR_DROPDOWN } from '../../../common/constants';
import {
    ListCategoryDropdown,
    ListFoodDropdown,
    ListProvinceDropdown,
    ListRoleDropdown,
    ListUserDropdown,
} from '../dto/responses/user-dropdown-response.dto';
import { QueryDropdown } from '../dto/request/dropdown.dto';
import { User } from 'src/modules/user/entity/user.entity';
import { Role } from 'src/modules/role/entity/role.entity';
import {
    WITH_DELETED_OPTION,
    WITH_INACTIVE_OPTION,
    WITH_WAITING_FOR_APPROVAL_OPTION,
} from '../common.constant';
import { Province } from 'src/modules/user/entity/province.entity';
import { UserStatus } from 'src/modules/user/user.constant';
import { Food } from 'src/modules/food/entity/food.entity';
import { makeFileUrl } from 'src/common/helpers/common.function';

const userDropdownListAttributes: (keyof User)[] = ['id', 'fullName', 'status'];
const roleDropdownListAttributes: (keyof Role)[] = ['id', 'name'];
const provinceDropdownListAttributes: (keyof Province)[] = ['id', 'name'];
const categoryDropdownListAttributes: (keyof Category)[] = [
    'id',
    'name',
    'priority',
    'note',
];
const foodDropdownListAttributes: (keyof Food)[] = ['id', 'foodName', 'price'];
@Injectable()
export class CommonDropdownService {
    constructor(
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
    ) {}

    generateQueryBuilder(
        queryBuilder,
        {
            page,
            limit,
            status,
            withDeleted,
            withInactive = WITH_INACTIVE_OPTION.YES,
            withWaitingForApproval = WITH_WAITING_FOR_APPROVAL_OPTION.YES,
        },
    ) {
        if (status && status.length > 0) {
            queryBuilder.andWhere(
                new Brackets((qb) => {
                    qb.where([
                        {
                            status: In(status),
                        },
                    ]);
                }),
            );
        }
        if (withDeleted === WITH_DELETED_OPTION.YES) {
            queryBuilder.withDeleted();
        }
        if (withInactive === WITH_INACTIVE_OPTION.NO) {
            queryBuilder.andWhere({
                status: Not(UserStatus.INACTIVE),
            });
        }
        if (withWaitingForApproval === WITH_WAITING_FOR_APPROVAL_OPTION.NO) {
            queryBuilder.andWhere({
                status: Not(UserStatus.WAITING_FOR_APPROVAL),
            });
        }
        let skip = 0;
        const take = limit;
        if (page) {
            skip = take * (page - 1);
        }
        queryBuilder.take(take).skip(skip);
    }

    async getListUser(query: QueryDropdown): Promise<ListUserDropdown> {
        try {
            const {
                page = 0,
                limit = DEFAULT_LIMIT_FOR_DROPDOWN,
                status = [],
                withDeleted = WITH_DELETED_OPTION.NO,
                withInactive = WITH_INACTIVE_OPTION.NO,
                withWaitingForApproval = WITH_WAITING_FOR_APPROVAL_OPTION.NO,
            } = query;
            const [items, totalItems] = await this.dbManager.findAndCount(
                User,
                {
                    select: userDropdownListAttributes,
                    where: (queryBuilder) => {
                        this.generateQueryBuilder(queryBuilder, {
                            page,
                            limit,
                            status,
                            withDeleted,
                            withInactive,
                            withWaitingForApproval,
                        });

                        queryBuilder.andWhere({
                            isSuperAdmin: false,
                        });
                    },
                },
            );
            return {
                totalItems,
                items,
            };
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async getListRole(query: QueryDropdown): Promise<ListRoleDropdown> {
        try {
            const { page, limit } = query;
            const [items, totalItems] = await this.dbManager.findAndCount(
                Role,
                {
                    select: roleDropdownListAttributes,
                    where: (queryBuilder) =>
                        this.generateQueryBuilder(queryBuilder, {
                            page,
                            limit,
                            status: [],
                            withDeleted: false,
                        }),
                },
            );
            return {
                totalItems,
                items,
            };
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async getListCategory(query: QueryDropdown): Promise<ListCategoryDropdown> {
        try {
            const { page, limit } = query;
            const [items, totalItems] = await this.dbManager.findAndCount(
                Category,
                {
                    select: categoryDropdownListAttributes,
                    where: (queryBuilder) =>
                        this.generateQueryBuilder(queryBuilder, {
                            page,
                            limit,
                            status: [],
                            withDeleted: false,
                        }),
                },
            );
            return {
                totalItems,
                items,
            };
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async getListFood(query: QueryDropdown): Promise<ListFoodDropdown> {
        try {
            const { page, limit } = query;
            const [items, totalItems] = await this.dbManager.findAndCount(
                Food,
                {
                    select: foodDropdownListAttributes,
                    where: (queryBuilder) =>
                        this.generateQueryBuilder(queryBuilder, {
                            page,
                            limit,
                            status: [],
                            withDeleted: false,
                        }),
                    relations: ['category', 'foodImgFile'],
                },
            );
            return {
                totalItems,
                items: items.map((item) => {
                    return {
                        ...item,
                        foodImg: item.foodImgFile
                            ? {
                                  ...item.foodImgFile,
                                  url: makeFileUrl(item.foodImgFile.fileName),
                              }
                            : null,
                    };
                }),
            };
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async getListProvince(query: QueryDropdown): Promise<ListProvinceDropdown> {
        try {
            const { page, limit } = query;
            const [items, totalItems] = await this.dbManager.findAndCount(
                Province,
                {
                    select: provinceDropdownListAttributes,
                    where: (queryBuilder) =>
                        this.generateQueryBuilder(queryBuilder, {
                            page,
                            limit,
                            status: [],
                            withDeleted: false,
                        }),
                },
            );
            return {
                totalItems,
                items,
            };
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
