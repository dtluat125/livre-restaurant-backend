import * as Joi from 'joi';
import {
    ARRAY_MAX_LENGTH,
    INPUT_TEXT_MAX_LENGTH,
} from '../../common/constants';

export const roleFields = {
    name: Joi.string()
        .max(INPUT_TEXT_MAX_LENGTH)
        .required()
        .label('role.fields.name'),
    description: Joi.string()
        .max(INPUT_TEXT_MAX_LENGTH)
        .optional()
        .allow(null, '')
        .label('role.fields.description'),
    permissionIds: Joi.array()
        .items(Joi.number().positive().required())
        .unique()
        .max(ARRAY_MAX_LENGTH)
        .required()
        .label('role.fields.permission'),
};
