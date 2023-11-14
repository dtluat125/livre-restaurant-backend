import { DBPermissionActions } from './../constant';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { TABLE_NAME } from '../constant';

dotenv.config();
export class SeedingPermissionActions1720963593396
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        const actionToInsert = Object.values(DBPermissionActions).map(
            (content) => {
                return {
                    content,
                };
            },
        );

        await queryRunner.manager
            .getRepository(TABLE_NAME.PermissionActions)
            .insert(actionToInsert);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `delete from ${TABLE_NAME.PermissionActions} where id <= ${
                Object.values(DBPermissionActions).length
            }`,
        );
    }
}
