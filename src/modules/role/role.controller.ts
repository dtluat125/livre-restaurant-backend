import {
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import {
    ErrorResponse,
    SuccessResponse,
} from '../../common/helpers/api.response';
import { JoiValidationPipe } from '../../common/pipes/joi.validation.pipe';
import { DatabaseService } from '../../common/services/database.service';
import {
    CreateRoleDto,
    CreateRoleSchema,
} from './dto/requests/create-role.dto';
import {
    RoleListQueryStringDto,
    RoleListQueryStringSchema,
} from './dto/requests/list-role.dto';
import {
    UpdateRoleDto,
    UpdateRoleSchema,
} from './dto/requests/update-role.dto';
import { RoleList } from './dto/responses/api-response.dto';
import { RoleResponseDto } from './dto/responses/role-response.dto';
import { RoleService } from './services/role.service';
import { Role } from './entity/role.entity';
import {
    AuthorizationGuard,
    Permissions,
} from 'src/common/guards/authorization.guard';
import {
    PermissionResources,
    PermissionActions,
} from 'src/modules/role/role.constants';
import { HttpStatus } from 'src/common/constants';
import { User } from '../user/entity/user.entity';
import {
    permissionList,
    resourceList,
} from 'src/modules/common/services/global-data.service';
import intersection from 'lodash/intersection';
import { TrimObjectPipe } from 'src/common/pipes/trim.object.pipe';

@Controller('role')
@UseGuards(JwtGuard, AuthorizationGuard)
export class RoleController {
    constructor(
        private readonly roleService: RoleService,
        private readonly i18n: I18nRequestScopeService,
        private readonly databaseService: DatabaseService,
    ) {}

    @Get('/permissions')
    @Permissions([`${PermissionResources.ROLE}_${PermissionActions.READ}`])
    getPermisisons() {
        try {
            const permissionListGroupByResource = resourceList.map(
                (resource) => {
                    const actionList = permissionList
                        .filter(
                            (permission) =>
                                permission.resource?.content ===
                                resource.content,
                        )
                        .map((permission) => ({
                            action: permission.action?.content,
                            permissionId: permission.id,
                        }));

                    return {
                        actions: actionList,
                        resource: resource.content,
                    };
                },
            );
            return new SuccessResponse({
                items: permissionListGroupByResource,
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get()
    @Permissions([`${PermissionResources.ROLE}_${PermissionActions.READ}`])
    async getRoles(
        @Query(new JoiValidationPipe(RoleListQueryStringSchema))
        query: RoleListQueryStringDto,
    ) {
        try {
            const data: RoleList = await this.roleService.getRoles(query);

            return new SuccessResponse(data);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post()
    @Permissions([`${PermissionResources.ROLE}_${PermissionActions.CREATE}`])
    async create(
        @Request() req,
        @Body(new TrimObjectPipe(), new JoiValidationPipe(CreateRoleSchema))
        data: CreateRoleDto,
    ) {
        try {
            const isNameExist = await this.databaseService.checkItemExist(
                Role,
                'name',
                data.name,
            );
            if (isNameExist) {
                const message = await this.i18n.translate(
                    'role.common.error.name.exist',
                );
                return new ErrorResponse(HttpStatus.BAD_REQUEST, message, []);
            }
            const existedPermission =
                intersection(
                    permissionList.map((item) => item.id),
                    data.permissionIds,
                ).length === data.permissionIds.length;
            // validate actionId and resourceId
            if (!existedPermission) {
                const message = await this.i18n.t(
                    'role.message.invalidPermission',
                );
                return new ErrorResponse(HttpStatus.BAD_REQUEST, message, [
                    {
                        errorCode: HttpStatus.ITEM_NOT_FOUND,
                        key: 'permissionIds',
                        message,
                    },
                ]);
            }
            data.createdBy = req.loginUser.id;
            const newRole: RoleResponseDto = await this.roleService.createRole(
                data,
            );
            await this.databaseService.recordUserLogging({
                userId: req.loginUser?.id,
                route: req.route,
                oldValue: {},
                newValue: { ...newRole },
            });
            return new SuccessResponse(newRole);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get(':id')
    @Permissions([`${PermissionResources.ROLE}_${PermissionActions.READ}`])
    async getRole(@Param('id', ParseIntPipe) id: number) {
        try {
            const role: RoleResponseDto = await this.roleService.getRole(id);
            if (!role) {
                const message = await this.i18n.translate(
                    'role.common.error.role.notFound',
                );
                return new ErrorResponse(HttpStatus.BAD_REQUEST, message, []);
            }
            return new SuccessResponse(role);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Patch(':id')
    @Permissions([`${PermissionResources.ROLE}_${PermissionActions.UPDATE}`])
    async updateRole(
        @Request() req,
        @Param('id') id: number,
        @Body(new TrimObjectPipe(), new JoiValidationPipe(UpdateRoleSchema))
        data: UpdateRoleDto,
    ) {
        try {
            const isRoleExist = await this.databaseService.checkItemExist(
                Role,
                'id',
                id,
            );
            if (!isRoleExist) {
                const message = await this.i18n.translate(
                    'role.common.error.role.notFound',
                );
                return new ErrorResponse(HttpStatus.BAD_REQUEST, message, []);
            }
            const isNameExist = await this.roleService.checkRoleNameUpdateExist(
                id,
                data.name,
            );
            if (isNameExist) {
                const message = await this.i18n.translate(
                    'role.common.error.name.exist',
                );
                return new ErrorResponse(HttpStatus.BAD_REQUEST, message, []);
            }
            const existedPermission =
                intersection(
                    permissionList.map((item) => item.id),
                    data.permissionIds,
                ).length === data.permissionIds.length;
            if (!existedPermission) {
                const message = await this.i18n.t(
                    'role.message.invalidPermission',
                );
                return new ErrorResponse(HttpStatus.BAD_REQUEST, message, [
                    {
                        errorCode: HttpStatus.UNPROCESSABLE_ENTITY,
                        key: 'actionId & resourceId',
                        message,
                    },
                ]);
            }
            data.updatedBy = req.loginUser.id;
            data.deletedBy = req.loginUser.id;
            const oldValue = await this.databaseService.getDataById(Role, id);
            const savedRole: RoleResponseDto =
                await this.roleService.updateRole(id, data);
            const newValue = await this.databaseService.getDataById(Role, id);
            await this.databaseService.recordUserLogging({
                userId: req.loginUser?.id,
                route: req.route,
                oldValue: { ...oldValue },
                newValue: { ...newValue },
            });
            return new SuccessResponse(savedRole);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Delete(':id')
    @Permissions([`${PermissionResources.ROLE}_${PermissionActions.DELETE}`])
    async remove(@Request() req, @Param('id', ParseIntPipe) id: number) {
        try {
            const role = await this.databaseService.checkItemExist(
                Role,
                'id',
                id,
            );
            if (!role) {
                const message = await this.i18n.translate(
                    'role.common.error.role.notFound',
                );
                return new ErrorResponse(HttpStatus.BAD_REQUEST, message, []);
            }
            const isRoleAssignedUser =
                await this.databaseService.checkItemExist(User, 'roleId', id);
            if (isRoleAssignedUser) {
                const message = await this.i18n.translate(
                    'role.common.error.role.assigned',
                );
                return new ErrorResponse(
                    HttpStatus.UNPROCESSABLE_ENTITY,
                    message,
                    [],
                );
            }
            const oldValue = await this.databaseService.getDataById(Role, id);
            await this.roleService.removeRole(id, req?.loginUser?.id);
            await this.databaseService.recordUserLogging({
                userId: req.loginUser?.id,
                route: req.route,
                oldValue: { ...oldValue },
                newValue: {},
            });
            return new SuccessResponse({ id });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
