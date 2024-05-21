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
    FoodBillingListQueryStringSchema,
    FoodBillingQueryStringDto,
    CreateFoodBillingSchema,
    CreateFoodBillingDto,
    UpdateFoodBillingSchema,
    UpdateFoodBillingDto,
} from './dto/food-billing.dto';
import { FoodBilling } from './entity/food-billing.entity';
import { FoodBillingService } from './service/food-billing.service';

@Controller('food-billing')
@UseGuards(JwtGuard, AuthorizationGuard)
export class FoodBillingController {
    constructor(
        private readonly foodBillingService: FoodBillingService,
        private readonly i18n: I18nRequestScopeService,
        private readonly databaseService: DatabaseService,
    ) {}

    @Get()
    @Permissions([
        `${PermissionResources.REPORT_REVENUE}_${PermissionActions.READ}`,
        `${PermissionResources.BILLING}_${PermissionActions.READ}`,
    ])
    async getFoodBillings(
        @Query(
            new RemoveEmptyQueryPipe(),
            new JoiValidationPipe(FoodBillingListQueryStringSchema),
        )
        query: FoodBillingQueryStringDto,
    ) {
        try {
            const materialList =
                await this.foodBillingService.getFoodBillingList(query);
            return new SuccessResponse(materialList);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get(':id')
    @Permissions([
        `${PermissionResources.REPORT_REVENUE}_${PermissionActions.READ}`,
        `${PermissionResources.BILLING}_${PermissionActions.READ}`,
    ])
    async getFoodBilling(@Param('id', ParseIntPipe) id: number) {
        try {
            const material = await this.foodBillingService.getFoodBillingDetail(
                id,
            );
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

    // @Post()
    // @Permissions([
    //     `${PermissionResources.REPORT_REVENUE}_${PermissionActions.CREATE}`,
    // ])
    // async createFoodBilling(
    //     @Request() req,
    //     @Body(
    //         new TrimObjectPipe(),
    //         new JoiValidationPipe(CreateFoodBillingSchema),
    //     )
    //     body: CreateFoodBillingDto,
    // ) {
    //     try {
    //         body.createdBy = req.loginUser.id;
    //         const newFoodBilling =
    //             await this.foodBillingService.createFoodBilling(body);
    //         await this.databaseService.recordUserLogging({
    //             userId: req.loginUser?.id,
    //             route: req.route,
    //             oldValue: {},
    //             newValue: { ...newFoodBilling },
    //         });
    //         return new SuccessResponse(newFoodBilling);
    //     } catch (error) {
    //         throw new InternalServerErrorException(error);
    //     }
    // }

    @Patch(':id')
    @Permissions([
        `${PermissionResources.REPORT_REVENUE}_${PermissionActions.UPDATE}`,
    ])
    async updateFoodBillingStatus(
        @Request() req,
        @Param('id', ParseIntPipe) id: number,
        @Body(
            new TrimObjectPipe(),
            new JoiValidationPipe(UpdateFoodBillingSchema),
        )
        body: UpdateFoodBillingDto,
    ) {
        try {
            const oldFoodBilling = await this.databaseService.getDataById(
                FoodBilling,
                id,
            );
            if (!oldFoodBilling) {
                const message = await this.i18n.translate(
                    'material.message.materialNotFound',
                );
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    message,
                    [],
                );
            }
            const material =
                await this.foodBillingService.updateFoodBillingStatus(id, body);
            const newValue = await this.databaseService.getDataById(
                FoodBilling,
                id,
            );
            await this.databaseService.recordUserLogging({
                userId: req.loginUser?.id,
                route: req.route,
                oldValue: { ...oldFoodBilling },
                newValue: { ...newValue },
            });
            return new SuccessResponse(material);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
