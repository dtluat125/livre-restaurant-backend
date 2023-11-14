import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { TABLE_NAME } from '../constant';
dotenv.config();

export class SeedingCategory1720963593402 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const categories = [
            {
                name: 'Laptop',
                priority: 1,
                note: '123',
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy: 1,
                updatedBy: 1,
            },
            {
                name: 'Kamenrider Heisei 1.0',
                priority: 2,
                note: '123',
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy: 1,
                updatedBy: 1,
            },
            {
                name: 'Kamenrider Heisei 2.0',
                priority: 3,
                note: '123',
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy: 1,
                updatedBy: 1,
            },
            {
                name: 'Cat',
                priority: 4,
                note: '123',
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy: 1,
                updatedBy: 1,
            },
        ];
        await queryRunner.manager
            .getRepository(TABLE_NAME.Categories)
            .insert(categories);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
            .getRepository(TABLE_NAME.Categories)
            .delete({});
    }
}
