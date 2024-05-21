import { TableDiagramService } from './../table-diagram/services/tableDiagram.service';
import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
    Request,
} from '@nestjs/common';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { JoiValidationPipe } from 'src/common/pipes/joi.validation.pipe';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { DatabaseService } from 'src/common/services/database.service';
import {
    ErrorResponse,
    SuccessResponse,
} from 'src/common/helpers/api.response';
import {
    AuthorizationGuard,
    Permissions,
} from 'src/common/guards/authorization.guard';
import {
    PermissionResources,
    PermissionActions,
} from 'src/modules/role/role.constants';
import { HttpStatus } from 'src/common/constants';
import { RemoveEmptyQueryPipe } from 'src/common/pipes/remove.empty.query.pipe';
import { TrimObjectPipe } from 'src/common/pipes/trim.object.pipe';
import {
    BillingListQueryStringSchema,
    BillingQueryStringDto,
    CreateBillingSchema,
    CreateBillingDto,
    UpdateBillingSchema,
    UpdateBillingDto,
} from './dto/billing.dto';
import { Billing } from './entity/billing.entity';
import { BillingService } from './service/billing.service';
import { BillingStatus } from './billing.constant';

@Controller('billing')
@UseGuards(JwtGuard, AuthorizationGuard)
export class BillingController {
    constructor(
        private readonly billingService: BillingService,
        private readonly i18n: I18nRequestScopeService,
        private readonly databaseService: DatabaseService,
        private readonly tableDiagramService: TableDiagramService,
    ) {}

    @Get()
    @Permissions([`${PermissionResources.BILLING}_${PermissionActions.READ}`])
    async getBillings(
        @Query(
            new RemoveEmptyQueryPipe(),
            new JoiValidationPipe(BillingListQueryStringSchema),
        )
        query: BillingQueryStringDto,
    ) {
        try {
            const materialList = await this.billingService.getBillingList(
                query,
            );
            return new SuccessResponse(materialList);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get(':id')
    @Permissions([`${PermissionResources.BILLING}_${PermissionActions.READ}`])
    async getBilling(@Param('id', ParseIntPipe) id: number) {
        try {
            const material = await this.billingService.getBillingDetail(id);
            if (!material) {
                const message = await this.i18n.translate(
                    'material.message.materialNotFound',
                );
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    message,
                    [],
                );
            }
            return new SuccessResponse(material);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post()
    @Permissions([`${PermissionResources.BILLING}_${PermissionActions.CREATE}`])
    async createBilling(
        @Request() req,
        @Body(new TrimObjectPipe(), new JoiValidationPipe(CreateBillingSchema))
        body: CreateBillingDto,
    ) {
        try {
            body.createdBy = req.loginUser.id;
            body.billingStatus = BillingStatus.WAIT_FOR_SELECT_FOOD;
            if (
                !(await this.tableDiagramService.checkCanSetupTable(
                    new Date(),
                    body.tableId,
                ))
            ) {
                const message = await this.i18n.translate(
                    'table.message.error.conflictTime',
                );
                return new ErrorResponse(HttpStatus.ITEM_IS_USING, message, []);
            }
            if (
                await this.tableDiagramService.checkTableIsUsing(body.tableId)
            ) {
                const message = await this.i18n.translate(
                    'table.message.error.tableUsing',
                );
                return new ErrorResponse(HttpStatus.ITEM_IS_USING, message, []);
            }

            const newBilling = await this.billingService.createBilling(body);
            await this.databaseService.recordUserLogging({
                userId: req.loginUser?.id,
                route: req.route,
                oldValue: {},
                newValue: { ...newBilling },
            });
            return new SuccessResponse(newBilling);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Patch(':id')
    @Permissions([`${PermissionResources.BILLING}_${PermissionActions.UPDATE}`])
    async updateBillingStatus(
        @Request() req,
        @Param('id', ParseIntPipe) id: number,
        @Body(new TrimObjectPipe(), new JoiValidationPipe(UpdateBillingSchema))
        body: UpdateBillingDto,
    ) {
        try {
            const oldBilling = await this.databaseService.getDataById(
                Billing,
                id,
            );
            if (!oldBilling) {
                const message = await this.i18n.translate(
                    'material.message.materialNotFound',
                );
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    message,
                    [],
                );
            }
            const material = await this.billingService.updateBillingStatus(
                id,
                body,
            );
            const newValue = await this.databaseService.getDataById(
                Billing,
                id,
            );
            await this.databaseService.recordUserLogging({
                userId: req.loginUser?.id,
                route: req.route,
                oldValue: { ...oldBilling },
                newValue: { ...newValue },
            });
            return new SuccessResponse(material);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
