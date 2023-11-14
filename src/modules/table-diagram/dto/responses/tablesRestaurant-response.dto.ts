import { TableStatus } from './../../../booking/booking.constant';
export interface TableDetailResponseDto {
    id: number;
    status?: TableStatus;
}
