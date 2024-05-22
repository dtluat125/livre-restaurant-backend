import {
    DATE_TIME_FORMAT,
    INPUT_PHONE_MAX_LENGTH,
    MAX_INTEGER,
    REGEX,
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
import {
    BillingStatus,
    OrderBy,
    PaymentMethod,
    ReasonCanceled,
} from '../billing.constant';

export const BillingListQueryStringSchema = Joi.object().keys({
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
    paymentTimeRange: Joi.array()
        .items(Joi.date())
        .optional()
        .length(2)
        .allow('')
        .label('billing.fields.payDate'),
});

export const BillingSchema = {
    customerName: Joi.string()
        .max(INPUT_TEXT_MAX_LENGTH)
        .optional()
        .allow(null, ''),
    customerPhone: Joi.string()
        .allow(null)
        .regex(RegExp(REGEX.PHONE_NUMBER))
        .max(INPUT_PHONE_MAX_LENGTH),
    tableId: Joi.number().max(MAX_INTEGER).optional().allow(null, ''),
    cashierId: Joi.number().max(MAX_INTEGER).optional().allow(null, ''),
    paymentTotal: Joi.number().max(MAX_INTEGER).optional().allow(null, ''),
    paymentMethod: Joi.string()
        .optional()
        .allow(null, '')
        .valid(...Object.values(PaymentMethod)),
    paymentTime: Joi.date().allow(null),
    arrivalTime: Joi.date()
        .allow(null)
        .format(DATE_TIME_FORMAT.YYYY_MM_DD_HYPHEN_HH_MM_COLON),
    billingStatus: Joi.string()
        .optional()
        .allow(null, '')
        .valid(...Object.values(BillingStatus)),
    reasonCanceled: Joi.string()
        .optional()
        .allow(null, '')
        .valid(...Object.values(ReasonCanceled)),
    note: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional().allow(null, ''),
};

export const CreateBillingSchema = Joi.object().keys({
    ...BillingSchema,
});

export const UpdateBillingSchema = Joi.object().keys({
    ...BillingSchema,
});

export class BillingQueryStringDto {
    page?: number;
    limit?: number;
    keyword?: string;
    orderBy?: OrderBy;
    orderDirection?: ORDER_DIRECTION;
    paymentTimeRange?: Date;
}

export class CreateBillingDto {
    customerName?: string;
    customerPhone?: string;
    tableId: number;
    cashierId?: number;
    paymentTotal?: number;
    paymentMethod?: PaymentMethod;
    paymentTime?: Date;
    arrivalTime: Date;
    billingStatus: BillingStatus;
    reasonCanceled?: ReasonCanceled;
    note?: string;
    createdBy?: number;
}

export class UpdateBillingDto {
    customerName?: string;
    customerPhone?: string;
    tableId?: number;
    cashierId?: number;
    paymentTotal?: number;
    paymentMethod?: PaymentMethod;
    paymentTime?: Date;
    arrivalTime?: Date;
    billingStatus?: BillingStatus;
    reasonCanceled?: ReasonCanceled;
    note?: string;
    updatedBy?: number;
}

export class BillingDetailResponseDto {
    id: number;
    customerName: string;
    customerPhone: string;
    tableId: number;
    cashierId: number;
    paymentTotal: number;
    paymentMethod: PaymentMethod;
    paymentTime: Date;
    arrivalTime: Date;
    billingStatus: BillingStatus;
    reasonCanceled: ReasonCanceled;
    note: string;
    createdBy?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
