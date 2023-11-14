import { TableSchema } from '../../tableDiagram.constant';
import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';
const Joi = BaseJoi.extend(JoiDate);
export interface CreateTableDto {
    name: string;
    numberPeople: number;
    createdBy: number;
}

export const CreateTableSchema = Joi.object().keys({
    ...TableSchema,
});
