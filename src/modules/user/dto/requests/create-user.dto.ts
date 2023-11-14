import { userFields, UserGender } from '../../user.constant';

import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';
const Joi = BaseJoi.extend(JoiDate);
import { INPUT_TEXT_MAX_LENGTH, REGEX } from 'src/common/constants';
export const CreateUserSchema = Joi.object().keys({
    ...userFields,
    email: Joi.string()
        .regex(REGEX.EMAIL)
        .max(INPUT_TEXT_MAX_LENGTH)
        .required()
        .label('user.fields.email'),
    password: Joi.string()
        .allow(null)
        .min(8)
        .max(INPUT_TEXT_MAX_LENGTH)
        .optional()
        .label('user.fields.password'),
    gender: Joi.string()
        .valid(...Object.values(UserGender))
        .required()
        .label('user.fields.gender'),
});

export class CreateUserDto {
    email: string;
    fullName: string;
    password?: string;
    phoneNumber: string;
    birthday?: Date;
    address?: string;
    note?: string;
    gender?: UserGender;
    roleId?: number;
    provinceId?: number;
    position?: string;
    createdBy: number;
}
