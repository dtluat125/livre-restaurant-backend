import { DashboardController } from './dashboard.controller';
import { Module } from '@nestjs/common';
import { DashboardService } from './service/dashboard.service';
import { DatabaseService } from 'src/common/services/database.service';

@Module({
    controllers: [DashboardController],
    providers: [DashboardService, DatabaseService],
})
export class DashboardModule {
    //
}
