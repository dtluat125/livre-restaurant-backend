import { BookingService } from './../booking/services/booking.service';
import { TableDiagramService } from './../table-diagram/services/tableDiagram.service';
import { FoodBillingService } from './../food-billing/service/food-billing.service';
import {
    ErrorResponse,
    SuccessResponse,
} from 'src/common/helpers/api.response';
import {
    Controller,
    Get,
    InternalServerErrorException,
    UseGuards,
    Query,
    Body,
    Post,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { JoiValidationPipe } from '../../common/pipes/joi.validation.pipe';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { queryDropdownSchema } from './dto/request/dropdown.dto';

import { CommonDropdownService } from './services/common-dropdown.service';
import {
    ListCategoryDropdown,
    ListFoodDropdown,
    ListProvinceDropdown,
    ListRoleDropdown,
    ListUserDropdown,
} from './dto/responses/user-dropdown-response.dto';
import { QueryDropdown } from './dto/request/dropdown.dto';
import {
    AuthorizationGuard,
    Permissions,
} from 'src/common/guards/authorization.guard';
import { RemoveEmptyQueryPipe } from 'src/common/pipes/remove.empty.query.pipe';

import {
    PermissionResources,
    PermissionActions,
} from 'src/modules/role/role.constants';
import { TrimObjectPipe } from 'src/common/pipes/trim.object.pipe';
import { MobileService } from './services/mobile.service';
import {
    CreateFoodBillingListSchema,
    CreateFoodBillingListDto,
} from '../food-billing/dto/food-billing.dto';
import { HttpStatus } from 'src/common/constants';
import { BillingService } from '../billing/service/billing.service';
import { BillingStatus } from '../billing/billing.constant';
import { I18nRequestScopeService } from 'nestjs-i18n';
import {
    TableListQueryStringSchema,
    TableListQueryStringDto,
} from '../table-diagram/dto/requests/list-tablesRestaurant.dto';
import {
    CreateBookingSchema,
    CreateBookingDto,
} from '../booking/dto/requests/create-booking.dto';
import { BookingStatus } from '../booking/booking.constant';

@Controller('common')
export class CommonController {
    constructor(
        private readonly commonDropdownService: CommonDropdownService,
        private readonly bookingService: BookingService,
        private readonly tableDiagramService: TableDiagramService,
        private readonly mobileService: MobileService,
        private readonly billingService: BillingService,
        private readonly foodBillingService: FoodBillingService,
        private readonly i18n: I18nRequestScopeService,
    ) {}

    @Get('/province')
    @UseGuards(JwtGuard)
    async getProvinces(
        @Query(
            new RemoveEmptyQueryPipe(),
            new JoiValidationPipe(queryDropdownSchema),
        )
        query: QueryDropdown,
    ) {
        try {
            const listProvince: ListProvinceDropdown =
                await this.commonDropdownService.getListProvince(query);

            return new SuccessResponse(listProvince);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('/user')
    @UseGuards(JwtGuard, AuthorizationGuard)
    @Permissions([`${PermissionResources.USER}_${PermissionActions.READ}`])
    async getUsers(
        @Query(
            new RemoveEmptyQueryPipe(),
            new JoiValidationPipe(queryDropdownSchema),
        )
        query: QueryDropdown,
    ) {
        try {
            const listUserDropdown: ListUserDropdown =
                await this.commonDropdownService.getListUser(query);
            return new SuccessResponse(listUserDropdown);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('/role')
    @UseGuards(JwtGuard, AuthorizationGuard)
    @Permissions([`${PermissionResources.USER}_${PermissionActions.READ}`])
    async getRoles(
        @Query(
            new RemoveEmptyQueryPipe(),
            new JoiValidationPipe(queryDropdownSchema),
        )
        query: QueryDropdown,
    ) {
        try {
            const listRoleDropdown: ListRoleDropdown =
                await this.commonDropdownService.getListRole(query);
            return new SuccessResponse(listRoleDropdown);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('/category')
    @UseGuards(JwtGuard)
    async getCategories(
        @Query(
            new RemoveEmptyQueryPipe(),
            new JoiValidationPipe(queryDropdownSchema),
        )
        query: QueryDropdown,
    ) {
        try {
            const data: ListCategoryDropdown =
                await this.commonDropdownService.getListCategory(query);
            return new SuccessResponse(data);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('/food')
    async getFood(
        @Query(
            new RemoveEmptyQueryPipe(),
            new JoiValidationPipe(queryDropdownSchema),
        )
        query: QueryDropdown,
    ) {
        try {
            const data: ListFoodDropdown =
                await this.commonDropdownService.getListFood(query);
            return new SuccessResponse(data);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('/billing/table/:id')
    async getBillingRelativeTable(@Param('id', ParseIntPipe) id: number) {
        try {
            const oldBilling = await this.mobileService.getBillingDetail(id, [
                BillingStatus.EATING,
                BillingStatus.WAIT_FOR_SELECT_FOOD,
            ]);

            console.log('oldBilling', oldBilling);

            if (!oldBilling) {
                const message = await this.i18n.translate(
                    'common.error.billing.notFound',
                );
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    message,
                    [],
                );
            }

            const billing = await this.mobileService.getBillingRelativeTable(
                id,
            );

            console.log('billing', billing);

            if (!billing) {
                const message = await this.i18n.translate(
                    'material.message.materialNotFound',
                );
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    message,
                    [],
                );
            }
            return new SuccessResponse(billing);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post('billing/:id/food')
    async prepareToPay(
        @Param('id', ParseIntPipe) id: number,
        @Body(
            new TrimObjectPipe(),
            new JoiValidationPipe(CreateFoodBillingListSchema),
        )
        body: CreateFoodBillingListDto,
    ) {
        try {
            const oldBilling = await this.billingService.getBillingDetail(id);
            if (!oldBilling) {
                const message = await this.i18n.translate(
                    'common.error.billing.notFound',
                );
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    message,
                    [],
                );
            }
            body.foodList.forEach((element) => {
                delete element.updatedAt;
            });
            await this.foodBillingService.createFoodBillings(body);
            let paymentTotal = 0;
            body.foodList.forEach((item) => {
                paymentTotal += item.quantity * item.singlePrice;
            });
            const billing = await this.billingService.updateBillingStatus(id, {
                paymentTotal,
                billingStatus: BillingStatus.WAIT_FOR_PAY,
            });
            return new SuccessResponse(billing);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('table')
    async getTables(
        @Query(
            new RemoveEmptyQueryPipe(),
            new JoiValidationPipe(TableListQueryStringSchema),
        )
        query: TableListQueryStringDto,
    ) {
        try {
            const tableList = await this.tableDiagramService.getTableList(
                query,
            );
            return new SuccessResponse(tableList);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post('booking')
    async create(
        @Body(new TrimObjectPipe(), new JoiValidationPipe(CreateBookingSchema))
        body: CreateBookingDto,
    ) {
        try {
            body.status = BookingStatus.WAITING_FOR_APPROVE;
            const newBooking = await this.bookingService.createBooking(body);
            return new SuccessResponse(newBooking);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
