import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { commonColumns, TABLE_NAME } from '../constant';

export class Permissions1639738518925 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME.Permissions,
                columns: [
                    ...commonColumns,
                    {
                        name: 'actionId',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'resourceId',
                        type: 'int',
                        isNullable: false,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(TABLE_NAME.Permissions);
    }
}
