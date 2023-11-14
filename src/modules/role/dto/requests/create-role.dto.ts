import * as Joi from 'joi';
import { roleFields } from '../../role.util';

export const CreateRoleSchema = Joi.object().keys({
    ...roleFields,
});

export class CreateRoleDto {
    name: string;
    permissionIds: number[];
    description: string;
    createdBy?: number;
}
