import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { commonColumns, DBPermissionActions, TABLE_NAME } from '../constant';

export class PermissionActions1639738518923 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME.PermissionActions,
                columns: [
                    ...commonColumns,
                    {
                        name: 'content',
                        type: 'enum',
                        enum: Object.values(DBPermissionActions),
                        isNullable: false,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(TABLE_NAME.PermissionActions);
    }
}
