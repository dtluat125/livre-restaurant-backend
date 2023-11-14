import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'role_permissions' })
export class RolePermission extends BaseEntity {
    @Column({ type: 'int', nullable: false })
    permissionId: number;

    @Column({ type: 'int', nullable: false })
    roleId: number;
}
