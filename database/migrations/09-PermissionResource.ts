import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { commonColumns, DBPermissionResources, TABLE_NAME } from '../constant';

export class PermissionResources1639738518924 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME.PermissionResources,
                columns: [
                    ...commonColumns,
                    {
                        name: 'content',
                        type: 'enum',
                        enum: Object.values(DBPermissionResources),
                        isNullable: false,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(TABLE_NAME.PermissionResources);
    }
}
