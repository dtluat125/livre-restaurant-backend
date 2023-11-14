import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Column, Entity } from 'typeorm';
import { IPermissionAction, IPermissionResource } from '../role.interface';

@Entity({ name: 'permissions' })
export class Permission extends BaseEntity {
    @Column({ type: 'int', nullable: false })
    actionId: number;

    @Column({ type: 'int', nullable: false })
    resourceId: number;

    action?: IPermissionAction;
    resource?: IPermissionResource;
}
