import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';
import {
    INPUT_TEXT_MAX_LENGTH,
    REGEX,
    MAX_INTEGER,
    INPUT_PHONE_MAX_LENGTH,
} from '../../common/constants';

const Joi = BaseJoi.extend(JoiDate);

export const MODULE_NAME = 'booking';

export enum BillingOrderBy {
    NAME = 'name',
    CREATED_AT = 'createdAt',
}

export enum BookingStatus {
    WAITING = 'waiting',
    WAITING_FOR_APPROVE = 'waiting_for_approve',
    CANCELED = 'canceled',
    DONE = 'done',
}

export enum TableStatus {
    BOOKED = 'booked',
    USED = 'used',
    READY = 'ready',
}

export const BookingSchema = {
    status: Joi.string()
        .optional()
        .allow(null, '')
        .valid(...Object.values(BookingStatus)),
    nameCustomer: Joi.string()
        .max(INPUT_TEXT_MAX_LENGTH)
        .label('booking.fields.nameCustomer'),
    phone: Joi.string()
        .allow(null)
        .regex(RegExp(REGEX.PHONE_NUMBER))
        .max(INPUT_PHONE_MAX_LENGTH)
        .optional()
        .label('booking.fields.phone'),
    tableId: Joi.number()
        .positive()
        .max(MAX_INTEGER)
        .label('booking.fields.tableId'),
    arrivalTime: Joi.date().label('booking.fields.arrivalTime'),
    numberPeople: Joi.number()
        .positive()
        .max(MAX_INTEGER)
        .label('booking.fields.numberPeople'),
};
