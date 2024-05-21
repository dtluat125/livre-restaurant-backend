import camelCase from 'lodash/camelCase';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import mapKeys from 'lodash/mapKeys';
import snakeCase from 'lodash/snakeCase';
import {
    actionList,
    permissionList,
    resourceList,
} from 'src/modules/common/services/global-data.service';
import { Role } from 'src/modules/role/entity/role.entity';
import {
    IPermissionAction,
    IPermissionResource,
    IPermissionResponse,
} from 'src/modules/role/role.interface';
import { Permission } from 'src/modules/role/entity/permission.entity';
import {
    PermissionActions,
    PermissionResources,
} from 'src/modules/role/role.constants';
import moment from 'moment';

export function generateHashToken(userId: number): string {
    const random = Math.floor(Math.random() * (10000 - 1000) + 1000);
    return `${userId}-${Date.now()}-${random}`;
}

export function extractToken(authorization = '') {
    if (/^Bearer /.test(authorization)) {
        return authorization.substring(7, authorization.length);
    }
    return '';
}
export function hasPermission(
    permissions: IPermissionResponse[],
    resource: PermissionResources,
    action: PermissionActions,
) {
    return (
        permissions
            .filter((ele) => ele.resource.content === resource)
            .findIndex((ele) => ele.action.content === action) !== -1
    );
}
export function makeFileUrl(fileName: string): string {
    return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
}
export function parseToCamelCase(data: any) {
    let dataString = JSON.stringify(data);
    function parse(item: any) {
        mapKeys(item, function (value, key) {
            if (isPlainObject(item[key] as any)) {
                parse(item[key]);
            }
            if (isArray(item[key])) {
                item[key].forEach((childItem: any) => parse(childItem));
            }
            dataString = dataString.replace(key, camelCase(key));
        });
    }
    parse(data);
    return JSON.parse(dataString);
}
export function parseToSnakeCase(data: any) {
    let dataString = JSON.stringify(data);
    function parse(item: any) {
        mapKeys(item, function (value, key) {
            if (isPlainObject(item[key] as any)) {
                parse(item[key]);
            }
            if (isArray(item[key])) {
                item[key].forEach((childItem: any) => parse(childItem));
            }
            dataString = dataString.replace(key, snakeCase(key));
        });
    }
    parse(data);
    return JSON.parse(dataString);
}

export function getHourFromTime(time: string): number {
    const splitedTime = time.split(':');
    return +splitedTime?.[0];
}

export function appendPermissionToRole(role: Role) {
    // get permissions
    // append permissions attribute from cached permissionList variable

    role.permissions = permissionList.filter((item) => {
        const listIds = role.rolePermissions.map((item) => item.permissionId);
        return listIds.includes(item.id);
    });
    delete role.rolePermissions;
    // append action and resource attributes from cached actions and resources
    role.permissions = role.permissions.map((permission) => {
        const action = actionList.find(
            (pAction) => pAction.id === permission.actionId,
        ) as IPermissionAction;
        const resource = resourceList.find(
            (pResource) => pResource.id === permission.resourceId,
        ) as IPermissionResource;
        return {
            action,
            resource,
            id: permission.id,
        } as Permission;
    });
}

export function calculateDuration(loginAt: string, logoutAt: string): number {
    const date1 = moment(loginAt);
    const date2 = moment(logoutAt);
    return date2.diff(date1, 'seconds');
}
