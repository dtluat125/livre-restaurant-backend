import { Global, Module } from '@nestjs/common';
import { DatabaseService } from 'src/common/services/database.service';
import { BillingService } from '../billing/service/billing.service';
import { TableDiagramService } from '../table-diagram/services/tableDiagram.service';
import { BookingController } from './booking.controller';
import { UpdateBookingStatusJob } from './cron-job/updateBookingStatus.job';
import { BookingService } from './services/booking.service';
@Global()
@Module({
    imports: [],
    providers: [
        BookingService,
        DatabaseService,
        TableDiagramService,
        UpdateBookingStatusJob,
        BillingService,
    ],
    controllers: [BookingController],
})
export class BookingModule {}
