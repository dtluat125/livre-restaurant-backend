import { TABLE_NAME } from '../constant';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedingPermissions1720963593398 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`insert into ${TABLE_NAME.Permissions} (actionId, resourceId, createdBy) values
        (1, 1, 1), (2, 1, 1), (3, 1, 1), (4, 1, 1),
        (1, 2, 1), (2, 2, 1), (3, 2, 1), (4, 2, 1), (5, 2, 1), (6, 2, 1),
        (1, 3, 1), (3, 3, 1), 
        (1, 4, 1), (2, 4, 1), (3, 4, 1), 
        (1, 5, 1), (2, 5, 1), (3, 5, 1), (4, 5, 1),
        (1, 6, 1), (2, 6, 1), (3, 6, 1), (4, 6, 1),
        (1, 7, 1), (2, 7, 1), (3, 7, 1), (4, 7, 1),
        (1, 8, 1), (2, 8, 1), (3, 8, 1), (4, 8, 1), (7, 8, 1),
        (1, 9, 1), (2, 9, 1), (3, 9, 1), (4, 9, 1)
        ;`);
    }

    public async down(queryRunner: QueryRunner) {
        const ids = [];
        for (let i = 1; i <= 60; i++) {
            ids.push(i);
        }
        await queryRunner.query(
            `delete from ${TABLE_NAME.Permissions} where id in (${ids.join(
                ',',
            )})`,
        );
    }
}
