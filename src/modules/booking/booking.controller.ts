import { TableDiagramService } from './../table-diagram/services/tableDiagram.service';
import { BookingStatus } from './booking.constant';
import {
    UpdateBookingSchema,
    UpdateBookingDto,
} from './dto/requests/update-booking.dto';
import { BookingService } from './services/booking.service';
import {
    Controller,
    Get,
    InternalServerErrorException,
    Query,
    Post,
    UseGuards,
    Body,
    Delete,
    Param,
    ParseIntPipe,
    Patch,
    Request,
} from '@nestjs/common';
import { I18nRequestScopeService } from 'nestjs-i18n';
import {
    SuccessResponse,
    ErrorResponse,
} from '../../common/helpers/api.response';

import { JoiValidationPipe } from '../../common/pipes/joi.validation.pipe';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { DatabaseService } from '../../common/services/database.service';
import {
    CreateBookingDto,
    CreateBookingSchema,
} from './dto/requests/create-booking.dto';
import {
    BookingListQueryStringDto,
    BookingListQueryStringSchema,
} from './dto/requests/list-booking.dto';
import { Booking } from './entity/booking.entity';
import {
    AuthorizationGuard,
    Permissions,
} from 'src/common/guards/authorization.guard';
import { HttpStatus } from 'src/common/constants';
import { RemoveEmptyQueryPipe } from 'src/common/pipes/remove.empty.query.pipe';
import { TrimObjectPipe } from 'src/common/pipes/trim.object.pipe';
import { PermissionActions, PermissionResources } from '../role/role.constants';
import { BillingService } from '../billing/service/billing.service';
import { BillingStatus } from '../billing/billing.constant';

@Controller({
    path: 'booking',
})
@UseGuards(JwtGuard, AuthorizationGuard)
export class BookingController {
    constructor(
        private readonly bookingService: BookingService,
        private readonly billingService: BillingService,
        private readonly tableDiagramService: TableDiagramService,
        private readonly databaseService: DatabaseService,
        private readonly i18n: I18nRequestScopeService,
    ) {}

    @Get()
    @Permissions([`${PermissionResources.BOOKING}_${PermissionActions.READ}`])
    async getBookings(
        @Query(
            new RemoveEmptyQueryPipe(),
            new JoiValidationPipe(BookingListQueryStringSchema),
        )
        query: BookingListQueryStringDto,
    ) {
        try {
            const bookingList = await this.bookingService.getBookingList(query);
            return new SuccessResponse(bookingList);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get(':id')
    @Permissions([`${PermissionResources.BOOKING}_${PermissionActions.READ}`])
    async getBooking(@Param('id', ParseIntPipe) id: number) {
        try {
            const booking = await this.bookingService.getBookingDetail(id);
            if (!booking) {
                const message = await this.i18n.translate(
                    'billing.message.error.itemNotExist',
                );
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    message,
                    [],
                );
            }
            return new SuccessResponse(booking);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post()
    @Permissions([`${PermissionResources.BOOKING}_${PermissionActions.CREATE}`])
    async create(
        @Request() req,
        @Body(new TrimObjectPipe(), new JoiValidationPipe(CreateBookingSchema))
        body: CreateBookingDto,
    ) {
        try {
            body.createdBy = req.loginUser.id;
            const newBooking = await this.bookingService.createBooking(body);
            await this.databaseService.recordUserLogging({
                userId: req.loginUser?.id,
                route: req.route,
                oldValue: {},
                newValue: { ...newBooking },
            });
            return new SuccessResponse(newBooking);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Patch(':id')
    @Permissions([`${PermissionResources.BOOKING}_${PermissionActions.UPDATE}`])
    async updateBooking(
        @Request() req,
        @Param('id') id: number,
        @Body(new TrimObjectPipe(), new JoiValidationPipe(UpdateBookingSchema))
        body: UpdateBookingDto,
    ) {
        try {
            const oldBooking = await this.databaseService.getDataById(
                Booking,
                id,
            );
            if (!oldBooking) {
                const message = await this.i18n.translate(
                    'billing.message.error.itemNotExist',
                );
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    message,
                    [],
                );
            }
            body.updatedBy = req.loginUser.id;
            if (body.tableId) {
                if (
                    !(await this.tableDiagramService.checkCanSetupTable(
                        body.arrivalTime,
                        body.tableId,
                        oldBooking.id,
                    ))
                ) {
                    const message = await this.i18n.translate(
                        'billing.message.error.conflictTime',
                    );
                    return new ErrorResponse(
                        HttpStatus.ITEM_IS_USING,
                        message,
                        [],
                    );
                } else if (body.status == BookingStatus.DONE) {
                    await this.billingService.createBilling({
                        customerName: body?.nameCustomer || '',
                        customerPhone: body?.phone || '',
                        tableId: body?.tableId || 0,
                        arrivalTime: new Date(),
                        billingStatus: BillingStatus.EATING,
                    });
                }
            }

            const updatedBooking = await this.bookingService.updateBooking(
                id,
                body,
            );
            // const isExistBookingWaiting =
            //     await this.bookingService.checkExistBookingWaitingInTable(
            //         updatedBooking.tableId,
            //     );
            // this.tableDiagramService.updateStatusTableRelativeBooking(
            //     updatedBooking.tableId,
            //     updatedBooking.status,
            //     isExistBookingWaiting,
            // );

            return new SuccessResponse(updatedBooking);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Delete(':id')
    @Permissions([`${PermissionResources.BOOKING}_${PermissionActions.DELETE}`])
    async deleteBooking(@Request() req, @Param('id', ParseIntPipe) id: number) {
        try {
            const oldBooking = await this.databaseService.getDataById(
                Booking,
                id,
            );
            if (!oldBooking) {
                const message = await this.i18n.translate(
                    'billing.message.error.itemNotExist',
                );
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    message,
                    [],
                );
            }

            await this.bookingService.deleteBooking(id, req.loginUser.id);
            const message = await this.i18n.translate(
                'billing.message.success.delete',
            );

            await this.databaseService.recordUserLogging({
                userId: req.loginUser?.id,
                route: req.route,
                oldValue: { ...oldBooking },
                newValue: {},
            });
            return new SuccessResponse({ id }, message);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
