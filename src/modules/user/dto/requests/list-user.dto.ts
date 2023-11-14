import {
    INPUT_TEXT_MAX_LENGTH,
    MAX_INTEGER,
    MAX_PAGE,
    MAX_PAGE_SIZE,
    MIN_PAGE,
    MIN_PAGE_SIZE,
} from '../../../../common/constants';

import { UserGender, UserOrderBy, UserStatus } from '../../user.constant';
import { ORDER_DIRECTION } from 'src/common/constants';
import * as Joi from 'joi';

export const UserListQueryStringSchema = Joi.object().keys({
    page: Joi.number().optional().min(MIN_PAGE).max(MAX_PAGE),
    limit: Joi.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).optional(),
    keyword: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional(),
    orderBy: Joi.string()
        .valid(...Object.values(UserOrderBy))
        .optional(),
    orderDirection: Joi.string()
        .valid(...Object.values(ORDER_DIRECTION))
        .optional(),
    genders: Joi.array()
        .items(Joi.string().valid(...Object.values(UserGender)))
        .optional(),
    statuses: Joi.array()
        .items(Joi.string().valid(...Object.values(UserStatus)))
        .optional(),
    roles: Joi.array()
        .items(Joi.number().positive().max(MAX_INTEGER).optional())
        .optional(),
    provinces: Joi.array()
        .items(Joi.number().positive().max(MAX_INTEGER).optional())
        .optional(),
    positions: Joi.array().items(Joi.string().optional()).optional(),
});
export class UserListQueryStringDto {
    page?: number;
    limit?: number;
    keyword?: string;
    orderBy?: string;
    orderDirection?: ORDER_DIRECTION;
    genders?: UserGender[];
    statuses?: UserStatus[];
    roles?: number[];
    provinces?: number[];
    positions?: number[];
}
