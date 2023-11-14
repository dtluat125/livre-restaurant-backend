import * as Joi from 'joi';
import {
    INPUT_TEXT_MAX_LENGTH,
    MAX_PAGE,
    MAX_PAGE_SIZE,
    MIN_PAGE,
    MIN_PAGE_SIZE,
    ORDER_DIRECTION,
} from 'src/common/constants';

export const RoleListQueryStringSchema = Joi.object().keys({
    page: Joi.number().optional().min(MIN_PAGE).max(MAX_PAGE),
    limit: Joi.number().optional().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE),
    keyword: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional(),
    orderBy: Joi.string().optional(),
    orderDirection: Joi.string()
        .valid(ORDER_DIRECTION.ASC, ORDER_DIRECTION.DESC)
        .optional(),
});

export class RoleListQueryStringDto {
    page?: number;
    limit?: number;
    keyword?: string;
    orderBy?: string;
    orderDirection?: ORDER_DIRECTION;
}
