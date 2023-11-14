import { DBPermissionResources } from './../constant';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { TABLE_NAME } from '../constant';

dotenv.config();
export class SeedingPermissionResources1720963593397
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        const resourceToInsert = Object.values(DBPermissionResources).map(
            (content) => {
                return {
                    content,
                };
            },
        );

        await queryRunner.manager
            .getRepository(TABLE_NAME.PermissionResources)
            .insert(resourceToInsert);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const ids = [];
        for (let i = 1; i <= 13; i++) {
            ids.push(i);
        }
        await queryRunner.query(
            `delete from ${
                TABLE_NAME.PermissionResources
            } where id in (${ids.join(',')})`,
        );
    }
}
