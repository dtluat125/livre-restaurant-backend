import { BookingStatus } from './../../booking.constant';
import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';
const Joi = BaseJoi.extend(JoiDate);
import {
    DATE_TIME_FORMAT,
    INPUT_TEXT_MAX_LENGTH,
    MAX_INTEGER,
    MAX_PAGE,
    MAX_PAGE_SIZE,
    MIN_PAGE,
    MIN_PAGE_SIZE,
    ORDER_DIRECTION,
} from 'src/common/constants';
import { BillingOrderBy } from '../../booking.constant';

export const BookingListQueryStringSchema = Joi.object().keys({
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
    status: Joi.array()
        .items(Joi.string().valid(...Object.values(BookingStatus)))
        .optional()
        .allow(null, ''),
    arrivalTimeRange: Joi.array()
        .items(
            Joi.date().format(DATE_TIME_FORMAT.YYYY_MM_DD_HYPHEN_HH_MM_COLON),
        )
        .optional()
        .length(2)
        .allow('')
        .label('billing.fields.payDate'),
    tableId: Joi.number().allow(null, '').optional(),
});

export interface BookingListQueryStringDto {
    page?: number;
    limit?: number;
    keyword?: string;
    orderBy?: string;
    orderDirection?: ORDER_DIRECTION;
    status?: BookingStatus[];
    arrivalTimeRange?: Date;
    tableId?: number;
}
