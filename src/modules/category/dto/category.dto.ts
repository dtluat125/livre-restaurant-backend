import { MAX_INTEGER, TEXTAREA_MAX_LENGTH } from '../../../common/constants';
import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';
const Joi = BaseJoi.extend(JoiDate);
import {
    INPUT_TEXT_MAX_LENGTH,
    MAX_PAGE,
    MAX_PAGE_SIZE,
    MIN_PAGE,
    MIN_PAGE_SIZE,
    ORDER_DIRECTION,
} from 'src/common/constants';
import { OrderBy } from '../category.constant';

export const CategoryListQueryStringSchema = Joi.object().keys({
    page: Joi.number().min(MIN_PAGE).max(MAX_PAGE).optional(),
    limit: Joi.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).optional(),
    keyword: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional().allow(null, ''),
    orderBy: Joi.string()
        .optional()
        .allow(null, '')
        .valid(...Object.values(OrderBy)),
    orderDirection: Joi.string()
        .valid(...Object.values(ORDER_DIRECTION))
        .optional()
        .allow(null, ''),
});

export const CategorySchema = {
    name: Joi.string()
        .max(INPUT_TEXT_MAX_LENGTH)
        .required()
        .label('category.fields.name'),
    note: Joi.string()
        .allow(null, '')
        .max(TEXTAREA_MAX_LENGTH)
        .optional()
        .label('category.fields.note'),
    priority: Joi.number()
        .min(0)
        .max(MAX_INTEGER)
        .optional()
        .allow(null)
        .label('category.fields.priority'),
};

export const CreateCategorySchema = Joi.object().keys({
    ...CategorySchema,
});

export const UpdateCategorySchema = Joi.object().keys({
    ...CategorySchema,
});

export interface CategoryListQueryStringDto {
    page?: number;
    limit?: number;
    keyword?: string;
    orderBy?: string;
    orderDirection?: ORDER_DIRECTION;
}

export interface CreateCategoryDto {
    name: string;
    priority: number;
    note: string;
    createdBy: number;
}

export interface UpdateCategoryDto {
    name: string;
    priority: number;
    note: string;
    updatedBy: number;
}

export class categoryDetailResponseDto {
    id: number;
    name: string;
    priority: number;
    note: string;
    createdBy?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
