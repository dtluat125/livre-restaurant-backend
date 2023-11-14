import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { GeneralSettings } from 'src/modules/common/entity/general-settings.entity';
import { GeneralSettingValueDto } from 'src/modules/setting/dto/request/general-setting.dto';
import {
    SettingKey,
    settingListAtttributes,
} from 'src/modules/setting/setting.constant';
import { EntityManager } from 'typeorm';
import { PermissionAction } from 'src/modules/role/entity/action.entity';
import { Permission } from 'src/modules/role/entity/permission.entity';
import { PermissionResource } from 'src/modules/role/entity/resource.entity';
import {
    IPermissionAction,
    IPermissionResource,
} from 'src/modules/role/role.interface';

export let actionList: IPermissionAction[] = [];
export let resourceList: IPermissionResource[] = [];
export let permissionList: Permission[] = [];

export let userPositionList: GeneralSettingValueDto[] = [];

@Injectable()
export class GlobalDataService {
    constructor(
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
    ) {
        this.getCachedData();
    }

    private async getCachedData() {
        if (userPositionList.length === 0) {
            await this.getUserPositionList();
        }
        if (actionList.length === 0) {
            await this.setActionList();
        }
        if (resourceList.length === 0) {
            await this.setResourceList();
        }
        if (permissionList.length === 0) {
            await this.setPermissionList();
        }
    }

    async getUserPositionList() {
        const setting = await this.dbManager.findOne(GeneralSettings, {
            select: settingListAtttributes,
            where: { key: SettingKey.USER_POSITION },
        });

        userPositionList = setting?.values || [];
    }

    private async setActionList() {
        actionList = await this.dbManager
            .getRepository(PermissionAction)
            .find({ select: ['id', 'content'] });
    }

    private async setResourceList() {
        resourceList = await this.dbManager
            .getRepository(PermissionResource)
            .find({ select: ['id', 'content'] });
    }

    private async setPermissionList() {
        permissionList = await this.dbManager
            .getRepository(Permission)
            .find({ select: ['id', 'actionId', 'resourceId'] });

        permissionList = permissionList.map((permission) => ({
            ...permission,
            action: actionList.find(
                (action) => action.id === permission.actionId,
            ),
            resource: resourceList.find(
                (resource) => resource.id === permission.resourceId,
            ),
        }));
    }
}
