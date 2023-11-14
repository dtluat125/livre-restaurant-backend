import { FloorRestaurant } from './../../tableDiagram.constant';
import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';
const Joi = BaseJoi.extend(JoiDate);
import {
    DATE_TIME_FORMAT,
    INPUT_TEXT_MAX_LENGTH,
    MAX_PAGE,
    MAX_PAGE_SIZE,
    MIN_PAGE,
    MIN_PAGE_SIZE,
    ORDER_DIRECTION,
} from 'src/common/constants';
import { BillingOrderBy } from '../../tableDiagram.constant';

export const TableListQueryStringSchema = Joi.object().keys({
    page: Joi.number().max(MAX_PAGE).allow(null, '').min(MIN_PAGE).optional(),
    limit: Joi.number()
        .max(MAX_PAGE_SIZE)
        .allow(null, '')
        .min(MIN_PAGE_SIZE)
        .optional(),
    keyword: Joi.string().allow(null, '').max(INPUT_TEXT_MAX_LENGTH).optional(),
    orderBy: Joi.string()
        .allow(null, '')
        .optional()
        .valid(...Object.values(BillingOrderBy)),
    orderDirection: Joi.string()
        .allow(null, '')
        .valid(...Object.values(ORDER_DIRECTION))
        .optional(),
    arrivalTimeRange: Joi.array()
        .items(Joi.date().format(DATE_TIME_FORMAT.YYYY_MM_DD_HYPHEN))
        .optional()
        .length(2)
        .allow('')
        .label('billing.fields.payDate'),
    floor: Joi.string()
        .allow(null)
        .valid(...Object.values(FloorRestaurant))
        .optional()
        .label('booking.fields.status'),
});

export interface TableListQueryStringDto {
    page?: number;
    limit?: number;
    keyword?: string;
    orderBy?: string;
    orderDirection?: ORDER_DIRECTION;
    arrivalTimeRange?: Date;
    floor?: FloorRestaurant;
}
