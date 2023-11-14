import { IPermissionResponse } from '../../role.interface';

export class PermissionResponseDto {
    module: string;
    permission: IPermissionResponse;
}
