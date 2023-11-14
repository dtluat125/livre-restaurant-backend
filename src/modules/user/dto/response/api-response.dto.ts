import {
    ApiResponse,
    CommonListResponse,
} from 'src/common/helpers/api.response';
import { RoleDropdownResponseDto } from 'src/modules/common/dto/responses/user-dropdown-response.dto';
import { UserResponseDto } from './user-response.dto';

export class UserList extends CommonListResponse<UserResponseDto> {
    items: UserResponseDto[];
}

export class RoleListDropdown extends CommonListResponse<RoleDropdownResponseDto> {
    items: RoleDropdownResponseDto[];
}

export class UserListResult extends ApiResponse<UserList> {
    data: UserList;
}

export class RoleListResultDropdown extends ApiResponse<RoleListDropdown> {
    data: RoleListDropdown;
}

export class UserDetailResult extends ApiResponse<UserResponseDto> {
    data: UserResponseDto;
}

export class UserRemoveResponseDto {
    id: number;
}

export class RemoveUserResult extends ApiResponse<UserRemoveResponseDto> {
    data: UserRemoveResponseDto;
}
