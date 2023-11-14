import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/common/services/database.service';
import { FoodService } from './service/food.service';
import { FoodController } from './food.controller';

@Module({
    controllers: [FoodController],
    providers: [FoodService, DatabaseService],
})
export class FoodModule {}
