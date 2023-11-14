import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Entity, Column } from 'typeorm';
import { Permission } from './permission.entity';
import { RolePermission } from './rolePermissionRelation.entity';

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
    @Column({ length: 255, nullable: false })
    name: string;

    @Column({ length: 2000, nullable: false })
    description: string;

    permissions: Permission[];

    rolePermissions: RolePermission[];
}
