import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/common/services/database.service';
import { FoodBillingService } from './service/food-billing.service';
import { FoodBillingController } from './food-billing.controller';

@Module({
    controllers: [FoodBillingController],
    providers: [FoodBillingService, DatabaseService],
})
export class FoodBillingModule {}
