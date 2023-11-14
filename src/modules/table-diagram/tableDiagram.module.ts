import { Global, Module } from '@nestjs/common';
import { DatabaseService } from 'src/common/services/database.service';
import { TableDiagramController } from './tableDiagram.controller';
import { TableDiagramService } from './services/tableDiagram.service';
import { BookingService } from '../booking/services/booking.service';
import { BillingService } from '../billing/service/billing.service';
@Global()
@Module({
    imports: [],
    providers: [
        TableDiagramService,
        DatabaseService,
        BookingService,
        BillingService,
    ],
    controllers: [TableDiagramController],
})
export class TableDiagramModule {}
