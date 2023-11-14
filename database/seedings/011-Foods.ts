import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { TABLE_NAME } from '../constant';
dotenv.config();

export class SeedingFood1720963593404 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const foods = [
            {
                foodName: 'Beefsteak',
                price: 12000,
                descriptions: 'Double version2',
                categoryId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy: 1,
                updatedBy: 1,
            },
            {
                foodName: 'Paella',
                price: 30000,
                descriptions: 'Double version2',
                categoryId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy: 1,
                updatedBy: 1,
            },
            {
                foodName: 'Nem Hải Sản',
                price: 150000,
                descriptions: 'Double version2',
                categoryId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy: 1,
                updatedBy: 1,
            },
            {
                foodName: 'Phở bò',
                price: 32000,
                descriptions: 'Double version2',
                categoryId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy: 1,
                updatedBy: 1,
            },
        ];
        await queryRunner.manager.getRepository(TABLE_NAME.Foods).insert(foods);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.getRepository(TABLE_NAME.Foods).delete({});
    }
}
