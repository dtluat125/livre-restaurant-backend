import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/common/services/database.service';
import { ReportRevenueService } from './service/report_revenue.service';
import { ReportRevenueController } from './report_revenue.controller';
import { CreateReportRevenueJob } from './cron-job/create_report_revenue.job';

@Module({
    controllers: [ReportRevenueController],
    providers: [ReportRevenueService, DatabaseService, CreateReportRevenueJob],
})
export class ReportRevenueModule {}
