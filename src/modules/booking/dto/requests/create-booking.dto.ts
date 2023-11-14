import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';
const Joi = BaseJoi.extend(JoiDate);
import { BookingSchema, BookingStatus } from '../../booking.constant';
export interface CreateBookingDto {
    status: BookingStatus;
    nameCustomer: string;
    phone: string;
    tableId: number;
    numberPeople: number;
    arrivalTime: Date;
    createdBy: number;
}

export const CreateBookingSchema = Joi.object().keys({
    ...BookingSchema,
});
