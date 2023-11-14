import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Entity, Column } from 'typeorm';
import { PermissionResources } from '../role.constants';

@Entity({ name: 'permission_resources' })
export class PermissionResource extends BaseEntity {
    @Column({ type: 'enum', nullable: false, enum: PermissionResources })
    content: PermissionResources;
}
