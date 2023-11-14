import * as Joi from 'joi';
import { roleFields } from '../../role.util';
import { CreateRoleDto } from './create-role.dto';

export const UpdateRoleSchema = Joi.object().keys({
    ...roleFields,
});

export class UpdateRoleDto extends CreateRoleDto {
    updatedBy?: number;
    deletedBy?: number;
}
