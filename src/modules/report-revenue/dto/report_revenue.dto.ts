import { AcceptStatus } from './../../common/common.constant';
import { SHIFT } from '../report_revenue.constant';
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
import { OrderBy } from '../report_revenue.constant';

export const ReportRevenueListQueryStringSchema = Joi.object().keys({
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
    dateRange: Joi.array()
        .items(Joi.date())
        .optional()
        .length(2)
        .allow('')
        .label('billing.fields.payDate'),
});

export const ReportRevenueSchema = {
    shift: Joi.string()
        .valid(...Object.values(SHIFT))
        .optional()
        .allow(null, ''),
    shiftLeaderId: Joi.number().max(MAX_INTEGER).optional().allow(null, ''),
    cashAtBeginningOfShift: Joi.number()
        .max(MAX_INTEGER)
        .optional()
        .allow(null, ''),
    cashAtEndingOfShift: Joi.number()
        .max(MAX_INTEGER)
        .optional()
        .allow(null, ''),
    billingRevenue: Joi.number().max(MAX_INTEGER).optional().allow(null, ''),
    bankingRevenue: Joi.number().max(MAX_INTEGER).optional().allow(null, ''),
    differenceRevenue: Joi.number().max(MAX_INTEGER).optional().allow(null, ''),
    note: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional().allow(null, ''),
    date: Joi.date(),
    billingCount: Joi.number().max(MAX_INTEGER).optional().allow(null, ''),
    status: Joi.string()
        .valid(...Object.values(AcceptStatus))
        .optional()
        .allow(null, ''),
};

export const CreateReportRevenueSchema = Joi.object().keys({
    ...ReportRevenueSchema,
});

export const UpdateReportRevenueSchema = Joi.object().keys({
    ...ReportRevenueSchema,
});

export class ReportRevenueQueryStringDto {
    page?: number;
    limit?: number;
    keyword?: string;
    orderBy?: OrderBy;
    orderDirection?: ORDER_DIRECTION;
    dateRange?: Date;
}

export class CreateReportRevenueDto {
    shift: SHIFT;
    billingRevenue: number;
    createdBy?: number;
}

export class UpdateReportRevenueDto {
    shift: SHIFT;
    shiftLeaderId: number;
    cashAtBeginningOfShift: number;
    cashAtEndingOfShift: number;
    bankingRevenue: number;
    differenceRevenue: number;
    date: string;
    billingCount: number;
    note: string;
    status: AcceptStatus;
    updatedBy?: number;
}

export class ReportRevenueDetailResponseDto {
    id: number;
    shift: SHIFT;
    shiftLeaderId: number;
    cashAtBeginningOfShift: number;
    cashAtEndingOfShift: number;
    bankingRevenue: number;
    billingRevenue: number;
    differenceRevenue: number;
    date: Date;
    billingCount: number;
    status: AcceptStatus;
    note: string;
    createdBy?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
