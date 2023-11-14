import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';
const Joi = BaseJoi.extend(JoiDate);

import { BookingSchema, BookingStatus } from '../../booking.constant';

export const UpdateBookingSchema = Joi.object().keys({
    ...BookingSchema,
});

export interface UpdateBookingDto {
    status: BookingStatus;
    nameCustomer: string;
    phone: string;
    tableId: number;
    numberPeople: number;
    arrivalTime: Date;
    updatedBy: number;
}
