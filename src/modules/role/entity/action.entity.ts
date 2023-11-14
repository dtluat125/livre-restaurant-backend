import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Entity, Column } from 'typeorm';
import { PermissionActions } from '../role.constants';

@Entity({ name: 'permission_actions' })
export class PermissionAction extends BaseEntity {
    @Column({ type: 'enum', nullable: false, enum: PermissionActions })
    content: PermissionActions;
}
