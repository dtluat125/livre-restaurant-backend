import { BookingStatus } from './../../booking.constant';
export interface BookingDetailResponseDto {
    id: number;
    nameCustomer: string;
    tableId?: number;
    status?: BookingStatus;
}
