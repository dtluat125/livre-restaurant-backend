import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { TABLE_NAME } from '../constant';
dotenv.config();

export class SeedingFoodBilling1720963593405 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const foodBillings = [
            {
                foodId: 1,
                billingId: 1,
                quantity: 3,
                note: 'ahihi',
                singlePrice: 20000,
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy: 1,
                updatedBy: 1,
            },
            {
                foodId: 2,
                billingId: 1,
                quantity: 6,
                note: 'ahihi',
                singlePrice: 15000,
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy: 1,
                updatedBy: 1,
            },
        ];
        await queryRunner.manager
            .getRepository(TABLE_NAME.FoodBillings)
            .insert(foodBillings);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
            .getRepository(TABLE_NAME.FoodBillings)
            .delete({});
    }
}
