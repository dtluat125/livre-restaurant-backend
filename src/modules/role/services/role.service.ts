import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
    DEFAULT_LIMIT_FOR_DROPDOWN,
    DEFAULT_ORDER_BY,
    DEFAULT_ORDER_DIRECTION,
} from 'src/common/constants';
import {
    Brackets,
    EntityManager,
    Like,
    Not,
    SelectQueryBuilder,
} from 'typeorm';
import { CreateRoleDto } from '../dto/requests/create-role.dto';
import { RoleListQueryStringDto } from '../dto/requests/list-role.dto';
import { UpdateRoleDto } from '../dto/requests/update-role.dto';
import { RoleList } from '../dto/responses/api-response.dto';
import { RoleResponseDto } from '../dto/responses/role-response.dto';
import { Role } from '../entity/role.entity';
import { RolePermission } from '../entity/rolePermissionRelation.entity';
import { appendPermissionToRole } from 'src/common/helpers/common.function';
import { roleAttributesList } from '../role.constants';

const roleAttributes: (keyof Role)[] = ['id', 'name', 'description'];
@Injectable()
export class RoleService {
    constructor(
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
    ) {}

    generateQueryBuilder(queryBuilder, { keyword }) {
        if (keyword) {
            const likeKeyword = `%${keyword}%`;
            queryBuilder.andWhere(
                new Brackets((qb) => {
                    qb.where([
                        {
                            name: Like(likeKeyword),
                        },
                    ]);
                }),
            );
        }
    }

    async getRoles(query: RoleListQueryStringDto): Promise<RoleList> {
        try {
            const {
                page,
                limit,
                keyword,
                orderBy = DEFAULT_ORDER_BY,
                orderDirection = DEFAULT_ORDER_DIRECTION,
            } = query;

            // Pagination
            const take = +limit || DEFAULT_LIMIT_FOR_DROPDOWN;
            const skip = (+page - 1) * take || 0;

            const [items, totalItems] = await this.dbManager.findAndCount(
                Role,
                {
                    select: roleAttributes,
                    where: (queryBuilder) =>
                        this.generateQueryBuilder(queryBuilder, { keyword }),
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

    private getRoleQueryBuilder(
        attributesList: string[],
    ): SelectQueryBuilder<Role> {
        return this.dbManager
            .createQueryBuilder(Role, 'role')
            .leftJoinAndMapMany(
                'role.rolePermissions',
                RolePermission,
                'rolePermission',
                'rolePermission.roleId = role.id',
            )
            .select(attributesList);
    }

    async getRole(id: number) {
        const role = await this.getRoleQueryBuilder(roleAttributesList)
            .where('role.id = :id', { id })
            .getOne();
        if (!role) {
            return undefined;
        }
        appendPermissionToRole(role);
        return role;
    }

    async createRole(role: CreateRoleDto): Promise<RoleResponseDto> {
        try {
            let roleId = undefined;
            await this.dbManager.transaction(async (entityManager) => {
                // insert to roles table
                const insertedRole = await entityManager
                    .getRepository(Role)
                    .insert({
                        name: role.name,
                        createdBy: role.createdBy,
                        description: role.description,
                    });
                roleId = insertedRole.identifiers[0].id;

                // insert into role_permissions table
                const rolePermissionRecords = role.permissionIds.map(
                    (permissionId) => ({
                        roleId,
                        permissionId: permissionId,
                        createdBy: role.createdBy,
                    }),
                );
                await entityManager
                    .getRepository(RolePermission)
                    .save([...rolePermissionRecords]);
            });
            return await this.getRole(roleId);
        } catch (error) {
            throw error;
        }
    }

    async updateRole(
        id: number,
        role: UpdateRoleDto,
    ): Promise<RoleResponseDto> {
        try {
            await this.dbManager.transaction(async (entityManager) => {
                await Promise.all([
                    // soft delete all role_permissions records by roleId
                    entityManager.getRepository(RolePermission).update(
                        {
                            roleId: id,
                        },
                        {
                            deletedAt: new Date(),
                            deletedBy: role.deletedBy,
                        },
                    ),
                    // update roles table
                    entityManager.getRepository(Role).update(
                        {
                            id,
                        },
                        {
                            name: role.name,
                            description: role.description,
                            updatedBy: role.updatedBy,
                        },
                    ),
                ]);
                // insert new role_permission records
                const rolePermissionRecords = role.permissionIds.map(
                    (item) => ({
                        permissionId: item,
                        roleId: id,
                    }),
                );
                await entityManager
                    .getRepository(RolePermission)
                    .insert([...rolePermissionRecords]);
            });

            return await this.getRole(id);
        } catch (error) {
            throw error;
        }
    }

    async checkRoleNameUpdateExist(id: number, name: string) {
        try {
            const restRoles = await this.dbManager.find(Role, {
                select: ['name'],
                where: { id: Not(id) },
            });

            const restRoleNames = restRoles.map((role) => role.name);

            return restRoleNames.includes(name);
        } catch (error) {
            throw error;
        }
    }

    async removeRole(id: number, userId: number) {
        try {
            const roleRecord = await this.dbManager
                .getRepository(Role)
                .findOne(id);
            await this.dbManager.getRepository(Role).save({
                ...roleRecord,
                deletedAt: new Date(),
                deletedBy: userId,
            });
        } catch (error) {
            throw error;
        }
    }
}
