import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/common/services/database.service';
import { BillingService } from './service/billing.service';
import { BillingController } from './billing.controller';
import { TableDiagramService } from '../table-diagram/services/tableDiagram.service';

@Module({
    controllers: [BillingController],
    providers: [BillingService, DatabaseService, TableDiagramService],
})
export class BillingModule {}
