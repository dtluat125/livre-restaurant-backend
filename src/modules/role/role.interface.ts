import { PermissionResources, PermissionActions } from './role.constants';

export interface IPermissionAction {
    id: number;
    content: PermissionActions;
}

export interface IPermissionResource {
    id: number;
    content: PermissionResources;
}

export interface IPermissionResponse {
    id: number;
    action: IPermissionAction;
    resource: IPermissionResource;
}
