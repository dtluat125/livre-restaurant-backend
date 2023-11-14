import { Province } from 'src/modules/user/entity/province.entity';
import { UserGender, UserStatus } from '../../user.constant';
import { Role } from 'src/modules/role/entity/role.entity';

export class UserResponseDto {
    id: number;
    email: string;
    fullName: string;
    birthday?: Date;
    phoneNumber?: string;
    note?: string;
    address?: string;
    gender?: UserGender;
    role?: Role;
    province?: Province;
    status?: UserStatus;
    position: string;
    lastLoginAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: number;
    updatedBy?: number;
    avatar?: Record<string, string>;
}
