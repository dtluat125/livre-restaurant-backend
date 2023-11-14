import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { commonColumns, TABLE_NAME } from '../constant';

export class RolePermissions1639738518926 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME.RolePermissions,
                columns: [
                    ...commonColumns,
                    {
                        name: 'permissionId',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'roleId',
                        type: 'int',
                        isNullable: false,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(TABLE_NAME.RolePermissions);
    }
}
