import {
    ApiResponse,
    CommonListResponse,
} from 'src/common/helpers/api.response';
import { PermissionResponseDto } from './permission-response.dto';
import { RoleResponseDto } from './role-response.dto';

export class PermissionList extends CommonListResponse<PermissionResponseDto> {
    items: PermissionResponseDto[];
}

export class PermissionListResult extends ApiResponse<PermissionList> {
    data: PermissionList;
}

export class RoleList extends CommonListResponse<RoleResponseDto> {
    items: RoleResponseDto[];
}

export class RoleListResult extends ApiResponse<RoleList> {
    data: RoleList;
}

export class RoleResult extends ApiResponse<RoleResponseDto> {
    data: RoleResponseDto;
}

export class RoleRemoveResponseDto {
    id: number;
}

export class RemoveRoleResult extends ApiResponse<RoleRemoveResponseDto> {
    data: RoleRemoveResponseDto;
}
