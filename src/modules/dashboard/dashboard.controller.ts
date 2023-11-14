import { DashboardService } from './service/dashboard.service';
import {
    Controller,
    Get,
    InternalServerErrorException,
    Query,
    UseGuards,
} from '@nestjs/common';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { JoiValidationPipe } from 'src/common/pipes/joi.validation.pipe';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { DatabaseService } from 'src/common/services/database.service';
import { SuccessResponse } from 'src/common/helpers/api.response';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';

import { RemoveEmptyQueryPipe } from 'src/common/pipes/remove.empty.query.pipe';
import { revenueChartListQuerySchema } from './dashboard.validator';
import { IRevenueChartListQuery } from './dashboard.interface';

@Controller('dashboard')
@UseGuards(JwtGuard, AuthorizationGuard)
export class DashboardController {
    constructor(
        private readonly dashboardService: DashboardService,
        private readonly i18n: I18nRequestScopeService,
        private readonly databaseService: DatabaseService,
    ) {}

    @Get('/revenue')
    async getRevenues(
        @Query(
            new RemoveEmptyQueryPipe(),
            new JoiValidationPipe(revenueChartListQuerySchema),
        )
        query: IRevenueChartListQuery,
    ) {
        try {
            const supportRequestCategoryList =
                await this.dashboardService.getRevenues(query);
            console.log(supportRequestCategoryList);

            return new SuccessResponse(supportRequestCategoryList);
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    @Get('/data')
    async getSupportRequestCategoryList(
        @Query(
            new RemoveEmptyQueryPipe(),
            new JoiValidationPipe(revenueChartListQuerySchema),
        )
        query: IRevenueChartListQuery,
    ) {
        try {
            const supportRequestCategoryList =
                await this.dashboardService.getData(query);
            console.log(supportRequestCategoryList);

            return new SuccessResponse(supportRequestCategoryList);
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }
}
