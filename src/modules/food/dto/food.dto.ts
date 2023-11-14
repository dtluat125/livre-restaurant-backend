import { MAX_INTEGER } from '../../../common/constants';
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
import { OrderBy } from '../food.constant';

export const FoodListQueryStringSchema = Joi.object().keys({
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

export const FoodSchema = {
    foodName: Joi.string()
        .max(INPUT_TEXT_MAX_LENGTH)
        .optional()
        .allow(null, ''),
    price: Joi.number().max(MAX_INTEGER).optional().allow(null, ''),
    categoryId: Joi.number().max(MAX_INTEGER).optional().allow(null, ''),
    foodImgId: Joi.number().max(MAX_INTEGER).optional().allow(null, ''),
};

export const CreateFoodSchema = Joi.object().keys({
    ...FoodSchema,
});

export const UpdateFoodSchema = Joi.object().keys({
    ...FoodSchema,
});

export class FoodQueryStringDto {
    page?: number;
    limit?: number;
    keyword?: string;
    orderBy?: OrderBy;
    orderDirection?: ORDER_DIRECTION;
}

export class CreateFoodDto {
    foodName: string;
    price: number;
    foodImgId?: number;
    categoryId?: number;
    createdBy?: number;
}

export class UpdateFoodDto {
    foodName: string;
    price: number;
    foodImgId?: number;
    categoryId?: number;
    updatedBy?: number;
}

export class FoodDetailResponseDto {
    id: number;
    foodName: string;
    price: number;
    foodImgId?: number;
    foodImg?: Record<string, string>;
    categoryId?: number;
    createdBy?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
