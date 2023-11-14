import { TableStatus } from './../../tableDiagram.constant';
import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';
const Joi = BaseJoi.extend(JoiDate);

import { TableSchema } from '../../tableDiagram.constant';

export const UpdateTableSchema = Joi.object().keys({
    ...TableSchema,
});

export interface UpdateTableDto {
    name?: string;
    numberPeople?: number;
    updatedBy?: number;
    status?: TableStatus;
}
