import {
    DATE_TIME_FORMAT,
    INPUT_MIN_DATE,
    MAX_INTEGER,
} from '../../../common/constants';
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
import { OrderBy, ReasonCanceled } from '../food-billing.constant';

export const FoodBillingListQueryStringSchema = Joi.object().keys({
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
    billingId: Joi.number().max(MAX_INTEGER).optional().allow(null, ''),
});

// export const FoodBillingSchema = {
//     foodId: Joi.number().max(MAX_INTEGER).optional().allow(null, ''),
//     billingId: Joi.number().max(MAX_INTEGER).optional().allow(null, ''),
//     selectedCount: Joi.number().max(MAX_INTEGER).optional().allow(null, ''),
//     processingCount: Joi.number().max(MAX_INTEGER).optional().allow(null, ''),
//     doneCount: Joi.number().max(MAX_INTEGER).optional().allow(null, ''),
//     canceledCount: Joi.number().max(MAX_INTEGER).optional().allow(null, ''),
//     reasonCanceled: Joi.string()
//         .optional()
//         .allow(null, '')
//         .valid(...Object.values(ReasonCanceled)),
//     note: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional().allow(null, ''),
// };

export const FoodBillingSchema = {
    foodId: Joi.number().max(MAX_INTEGER).optional().allow(null, ''),
    billingId: Joi.number().max(MAX_INTEGER).optional().allow(null, ''),
    quantity: Joi.number().max(MAX_INTEGER).optional().allow(null, ''),
    tableName: Joi.string()
        .max(INPUT_TEXT_MAX_LENGTH)
        .optional()
        .allow(null, ''),
    note: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional().allow(null, ''),
};

export const CreateFoodBillingSchema = Joi.object().keys({
    ...FoodBillingSchema,
});

export const CreateFoodBillingListSchema = Joi.object().keys({
    foodList: Joi.array().items(
        Joi.object().keys({
            foodId: Joi.number().max(MAX_INTEGER).optional().allow(null, ''),
            billingId: Joi.number().max(MAX_INTEGER).optional().allow(null, ''),
            quantity: Joi.number().max(MAX_INTEGER).optional().allow(null, ''),
            singlePrice: Joi.number()
                .max(MAX_INTEGER)
                .optional()
                .allow(null, ''),
            tableName: Joi.string().max(INPUT_TEXT_MAX_LENGTH).allow(null, ''),
            note: Joi.string()
                .max(INPUT_TEXT_MAX_LENGTH)
                .optional()
                .allow(null, ''),
            updatedAt: Joi.date()
                .allow(null, '')
                .format(DATE_TIME_FORMAT.YYYY_MM_DD_HYPHEN_HH_MM_SS_COLON)
                .min(INPUT_MIN_DATE)
                .optional(),
            isBring: Joi.boolean().optional(),
        }),
    ),
    note: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional().allow(null, ''),
});

export const UpdateFoodBillingSchema = Joi.object().keys({
    ...FoodBillingSchema,
});

export class FoodBillingQueryStringDto {
    page?: number;
    limit?: number;
    keyword?: string;
    orderBy?: OrderBy;
    billingId?: number;
    orderDirection?: ORDER_DIRECTION;
}

// export class CreateFoodBillingDto {
//     foodId: number;
//     billingId: number;
//     selectedCount: number;
//     processingCount: number;
//     doneCount: number;
//     canceledCount: number;
//     reasonCanceled: ReasonCanceled;
//     note: string;
//     createdBy?: number;
// }

export class CreateFoodBillingDto {
    foodId: number;
    tableName: string;
    billingId: number;
    quantity: number;
    singlePrice: number;
    note: string;
    updatedAt: string;
    createdBy?: number;
}

export class CreateFoodBillingListDto {
    foodList: CreateFoodBillingDto[];
}
// export class UpdateFoodBillingDto {
//     foodId: number;
//     billingId: number;
//     selectedCount: number;
//     processingCount: number;
//     doneCount: number;
//     canceledCount: number;
//     reasonCanceled: ReasonCanceled;
//     note: string;
//     updatedBy?: number;
// }

export class UpdateFoodBillingDto {
    foodId: number;
    billingId: number;
    singlePrice: number;
    quantity: number;
    note: string;
    updatedBy?: number;
}

// export class FoodBillingDetailResponseDto {
//     id: number;
//     foodId: number;
//     billingId: number;
//     selectedCount: number;
//     processingCount: number;
//     doneCount: number;
//     canceledCount: number;
//     reasonCanceled: ReasonCanceled;
//     note: string;
//     createdBy?: number;
//     createdAt?: Date;
//     updatedAt?: Date;
// }

export class FoodBillingDetailResponseDto {
    id: number;
    foodId: number;
    billingId: number;
    singlePrice: number;
    quantity: number;
    note: string;
    createdBy?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
