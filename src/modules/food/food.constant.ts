import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';

const Joi = BaseJoi.extend(JoiDate);

export const MODULE_NAME = 'food';

export enum OrderBy {
    CREATED_AT = 'createdAt',
}
