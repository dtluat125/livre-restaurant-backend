import {
    DEFAULT_FIRST_PAGE,
    DEFAULT_LIMIT_FOR_PAGINATION,
    DEFAULT_ORDER_BY,
    DEFAULT_ORDER_DIRECTION,
    TYPE_ORM_ORDER_DIRECTION,
} from '../../../common/constants';
import {
    Inject,
    Injectable,
    InternalServerErrorException,
    Optional,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { EntityManager, In, Like, Brackets } from 'typeorm';

import { File } from 'src/modules/file/entity/file.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { CreateUserDto } from '../dto/requests/create-user.dto';
import { userListAttributes, UserStatus } from '../user.constant';
import { UserListQueryStringDto } from '../dto/requests/list-user.dto';
import { UserList } from '../dto/response/api-response.dto';
import { UserResponseDto } from '../dto/response/user-response.dto';
import { UpdateUserDto } from '../dto/requests/update-user.dto';
import { UserStatusDto } from '../dto/requests/common-user.dto';
import {
    appendPermissionToRole,
    makeFileUrl,
} from 'src/common/helpers/common.function';
import { Role } from 'src/modules/role/entity/role.entity';
import { RolePermission } from 'src/modules/role/entity/rolePermissionRelation.entity';

@Injectable()
export class UserService {
    constructor(
        @Optional() @Inject(REQUEST) private readonly request: Request,
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
    ) {}

    generateQueryBuilder(
        queryBuilder,
        { keyword, genders, statuses, roles, provinces, positions },
    ) {
        queryBuilder.andWhere({
            isSuperAdmin: false,
        });
        if (keyword) {
            const likeKeyword = `%${keyword}%`;
            queryBuilder.andWhere(
                new Brackets((qb) => {
                    qb.where([
                        {
                            fullName: Like(likeKeyword),
                        },
                        {
                            email: Like(likeKeyword),
                        },
                        {
                            address: Like(likeKeyword),
                        },
                    ]);
                }),
            );
        }
        if (statuses && statuses.length > 0) {
            queryBuilder.andWhere({
                status: In(statuses),
            });
        }
        if (genders && genders.length > 0) {
            queryBuilder.andWhere({
                gender: In(genders),
            });
        }
        if (roles && roles.length > 0) {
            queryBuilder.andWhere({
                roleId: In(roles),
            });
        }
        if (provinces && provinces.length > 0) {
            queryBuilder.andWhere({
                provinceId: In(provinces),
            });
        }
        if (positions && positions.length > 0) {
            queryBuilder.andWhere({
                position: In(positions),
            });
        }
    }

    async getUsers(query: UserListQueryStringDto): Promise<UserList> {
        try {
            const {
                page = DEFAULT_FIRST_PAGE,
                limit = DEFAULT_LIMIT_FOR_PAGINATION,
                keyword = '',
                orderBy = DEFAULT_ORDER_BY,
                orderDirection = DEFAULT_ORDER_DIRECTION,
                genders = [],
                statuses = [],
                roles = [],
                provinces = [],
                positions = [],
            } = query;

            const _queryBuilder = this.dbManager
                .createQueryBuilder(User, 'users')
                .leftJoinAndMapOne(
                    'users.avatar',
                    File,
                    'file',
                    'file.id = users.avatarId',
                )
                .where((queryBuilder) => {
                    this.generateQueryBuilder(queryBuilder, {
                        keyword,
                        roles,
                        statuses,
                        genders,
                        provinces,
                        positions,
                    });
                })
                .select(userListAttributes);
            if (orderBy) {
                _queryBuilder.orderBy(
                    `users.${orderBy}`,
                    orderDirection.toUpperCase() as TYPE_ORM_ORDER_DIRECTION,
                );
            }
            if (limit && page)
                _queryBuilder.take(limit).skip((page - 1) * limit);
            const [items, totalItems] = await _queryBuilder.getManyAndCount();

            return {
                items: items.map((item) => {
                    return {
                        ...item,
                        avatar: item.avatar
                            ? {
                                  ...item.avatar,
                                  url: makeFileUrl(item.avatar.fileName),
                              }
                            : null,
                    };
                }),
                totalItems: totalItems,
            };
        } catch (error) {
            throw error;
        }
    }

    async getInUseUserPosition(): Promise<string[]> {
        try {
            const users = await this.dbManager
                .getRepository(User)
                .createQueryBuilder('users')
                .select('position')
                .distinct(true)
                .getRawMany();
            const userPositions = (users || []).map((user) => user.position);
            return userPositions;
        } catch (error) {
            throw error;
        }
    }

    public async appendRoleToUser(user: User) {
        try {
            const role = await this.dbManager
                .createQueryBuilder(Role, 'role')
                .leftJoinAndMapMany(
                    'role.rolePermissions',
                    RolePermission,
                    'rolePermission',
                    'rolePermission.roleId = role.id',
                )
                .where('role.id = :userId', { userId: user.roleId })
                .select([
                    'role.id',
                    'role.name',
                    'role.description',
                    'rolePermission.permissionId',
                ])
                .getOne();
            appendPermissionToRole(role);
            user.role = role;
        } catch (error) {
            console.log('Error in appendRoleToUser');
            throw new InternalServerErrorException(error);
        }
    }

    async getUserById(id: number): Promise<UserResponseDto> {
        try {
            const user = await this.dbManager.findOne(User, {
                relations: ['role', 'province'],
                where: { id },
            });
            await this.appendRoleToUser(user);

            if (user?.avatarId) {
                const file = await this.dbManager.findOne(File, {
                    where: { id: user.avatarId },
                });
                return {
                    ...user,
                    avatar: {
                        id: user.avatarId.toString(),
                        avatarName: file.fileName,
                        url: file.fileName ? makeFileUrl(file.fileName) : null,
                    },
                };
            }

            return user;
        } catch (error) {
            throw error;
        }
    }

    async createUser(user: CreateUserDto): Promise<UserResponseDto> {
        try {
            const newUser = {
                ...user,
                status: UserStatus.WAITING_FOR_APPROVAL,
                email: user.email.toLocaleLowerCase(),
            };
            if (user?.password) {
                newUser.password = bcrypt.hashSync(
                    newUser.password,
                    bcrypt.genSaltSync(10),
                );
            }
            const insertedUser = await this.dbManager
                .getRepository(User)
                .insert(newUser);
            const userId = insertedUser?.identifiers[0]?.id;
            if (userId) {
                const userDetail = await this.getUserById(userId);
                return userDetail;
            }
            throw new InternalServerErrorException();
        } catch (error) {
            throw error;
        }
    }

    async updateUser(
        id: number,
        user: UpdateUserDto,
    ): Promise<UserResponseDto> {
        try {
            const currentUser = {
                ...user,
            };

            await this.dbManager.update(User, id, currentUser);

            const savedUser = await this.getUserById(id);

            return savedUser;
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(id: number, deletedBy: number): Promise<void> {
        try {
            const timeNow = new Date();
            await Promise.all([
                this.dbManager.update(
                    User,
                    { id },
                    {
                        deletedAt: timeNow,
                        deletedBy,
                    },
                ),
            ]);
        } catch (error) {
            throw error;
        }
    }

    async updateUserStatus(
        id: number,
        data: UserStatusDto,
    ): Promise<UserResponseDto> {
        try {
            await this.dbManager.update(User, id, { status: data.status });

            const savedUser = await this.getUserById(id);

            return savedUser;
        } catch (error) {
            throw error;
        }
    }
}
