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
    CreateReportRevenueDto,
    CreateReportRevenueSchema,
    ReportRevenueListQueryStringSchema,
    ReportRevenueQueryStringDto,
    UpdateReportRevenueDto,
    UpdateReportRevenueSchema,
} from './dto/report_revenue.dto';
import { ReportRevenue } from './entity/report_revenue.entity';
import { ReportRevenueService } from './service/report_revenue.service';

@Controller('report-revenue')
@UseGuards(JwtGuard, AuthorizationGuard)
export class ReportRevenueController {
    constructor(
        private readonly reportRevenueService: ReportRevenueService,
        private readonly i18n: I18nRequestScopeService,
        private readonly databaseService: DatabaseService,
    ) {}

    @Get()
    @Permissions([
        `${PermissionResources.REPORT_REVENUE}_${PermissionActions.READ}`,
    ])
    async getExportReportRevenues(
        @Query(
            new RemoveEmptyQueryPipe(),
            new JoiValidationPipe(ReportRevenueListQueryStringSchema),
        )
        query: ReportRevenueQueryStringDto,
    ) {
        try {
            const materialList =
                await this.reportRevenueService.getReportRevenueList(query);
            return new SuccessResponse(materialList);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get(':id')
    @Permissions([
        `${PermissionResources.REPORT_REVENUE}_${PermissionActions.READ}`,
    ])
    async getReportRevenue(@Param('id', ParseIntPipe) id: number) {
        try {
            const material =
                await this.reportRevenueService.getReportRevenueDetail(id);
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

    @Patch(':id')
    @Permissions([
        `${PermissionResources.REPORT_REVENUE}_${PermissionActions.UPDATE}`,
    ])
    async updateReportRevenueStatus(
        @Request() req,
        @Param('id', ParseIntPipe) id: number,
        @Body(
            new TrimObjectPipe(),
            new JoiValidationPipe(UpdateReportRevenueSchema),
        )
        body: UpdateReportRevenueDto,
    ) {
        try {
            const oldReportRevenue = await this.databaseService.getDataById(
                ReportRevenue,
                id,
            );
            if (!oldReportRevenue) {
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
                await this.reportRevenueService.updateReportRevenueStatus(
                    id,
                    body,
                );
            const newValue = await this.databaseService.getDataById(
                ReportRevenue,
                id,
            );
            await this.databaseService.recordUserLogging({
                userId: req.loginUser?.id,
                route: req.route,
                oldValue: { ...oldReportRevenue },
                newValue: { ...newValue },
            });
            return new SuccessResponse(material);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
