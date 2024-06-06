import { BookingDetailResponseDto } from './../dto/responses/booking-response.dto';
import { UpdateBookingDto } from './../dto/requests/update-booking.dto';
import { CreateBookingDto } from './../dto/requests/create-booking.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
    DEFAULT_FIRST_PAGE,
    DEFAULT_LIMIT_FOR_PAGINATION,
    DEFAULT_ORDER_BY,
    DEFAULT_ORDER_DIRECTION,
} from 'src/common/constants';
import { Brackets, EntityManager, In, Like } from 'typeorm';
import { Booking } from '../entity/booking.entity';
import { BookingListQueryStringDto } from '../dto/requests/list-booking.dto';
import { BookingStatus } from '../booking.constant';
import moment from 'moment-timezone';

const bookingAttributes: (keyof Booking)[] = [
    'id',
    'status',
    'nameCustomer',
    'phone',
    'arrivalTime',
    'tableId',
    'numberPeople',
    'tablesRestaurant',
    'createdAt',
];
@Injectable()
export class BookingService {
    constructor(private readonly dbManager: EntityManager) {}

    generateQueryBuilder(
        queryBuilder,
        { keyword, status, arrivalTimeRange, tableId },
    ) {
        if (keyword) {
            const likeKeyword = `%${keyword}%`;
            queryBuilder.andWhere(
                new Brackets((qb) => {
                    qb.where([
                        {
                            nameCustomer: Like(likeKeyword),
                        },
                        {
                            phone: Like(likeKeyword),
                        },
                    ]);
                }),
            );
        }

        if (status && status.length > 0) {
            queryBuilder.andWhere({
                status: In(status),
            });
        }

        if (tableId) {
            queryBuilder.andWhere({
                tableId: tableId,
            });
        }

        if (arrivalTimeRange.length === 2) {
            queryBuilder.andWhere(
                new Brackets((qb) => {
                    qb.where(
                        'Booking.arrivalTime BETWEEN :startDay AND :endDay',
                        {
                            startDay: arrivalTimeRange[0],
                            endDay: arrivalTimeRange[1],
                        },
                    );
                }),
            );
        }
    }

    async getBookingList(query: BookingListQueryStringDto) {
        try {
            const {
                page = DEFAULT_FIRST_PAGE,
                limit = DEFAULT_LIMIT_FOR_PAGINATION,
                keyword = '',
                orderBy = DEFAULT_ORDER_BY,
                orderDirection = DEFAULT_ORDER_DIRECTION,
                status = [],
                arrivalTimeRange = [],
                tableId = null,
            } = query;

            // Pagination
            const take = +limit || DEFAULT_LIMIT_FOR_PAGINATION;
            const skip = (+page - 1) * take || 0;

            const [items, totalItems] = await this.dbManager.findAndCount(
                Booking,
                {
                    select: bookingAttributes,
                    relations: ['tablesRestaurant'],
                    where: (queryBuilder) =>
                        this.generateQueryBuilder(queryBuilder, {
                            keyword,
                            status,
                            arrivalTimeRange,
                            tableId,
                        }),
                    order: {
                        [orderBy]: orderDirection.toUpperCase(),
                    },
                    take,
                    skip,
                },
            );

            return {
                items,
                totalItems,
            };
        } catch (error) {
            throw error;
        }
    }

    async getBookingDetail(id: number): Promise<BookingDetailResponseDto> {
        try {
            const booking = await this.dbManager.findOne(Booking, {
                select: bookingAttributes,
                where: { id },
                relations: ['tablesRestaurant'],
            });
            return booking;
        } catch (error) {
            throw error;
        }
    }

    async checkExistBookingWaitingInTable(tableId: number): Promise<boolean> {
        try {
            const count = await this.dbManager.count(Booking, {
                where: { tableId, status: BookingStatus.WAITING },
            });
            return count > 0;
        } catch (error) {
            throw error;
        }
    }

    async createBooking(
        booking: CreateBookingDto,
    ): Promise<BookingDetailResponseDto> {
        try {
            console.log('booking', booking);
            const insertedBooking = await this.dbManager
                .getRepository(Booking)
                .insert(booking);
            const bookingId = insertedBooking?.identifiers[0]?.id;
            if (bookingId) {
                const tableDetail = await this.getBookingDetail(bookingId);
                console.log('tableDetail', tableDetail);
                return tableDetail;
            }
            throw new InternalServerErrorException();
        } catch (error) {
            throw error;
        }
    }

    async updateBooking(id: number, booking: UpdateBookingDto) {
        try {
            await this.dbManager.getRepository(Booking).update({ id }, booking);
            const updatedBooking = await this.getBookingDetail(id);
            return updatedBooking;
        } catch (error) {
            throw error;
        }
    }

    async deleteBooking(id: number, deletedBy: number) {
        try {
            await this.dbManager.update(
                Booking,
                { id },
                {
                    deletedAt: new Date(),
                    deletedBy,
                },
            );
        } catch (error) {
            throw error;
        }
    }
}
