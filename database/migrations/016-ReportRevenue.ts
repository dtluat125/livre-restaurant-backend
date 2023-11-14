import { AcceptStatus } from './../../src/modules/common/common.constant';
import { SHIFT } from '../../src/modules/report-revenue/report_revenue.constant';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TABLE_NAME } from '../constant';

export class ReportRevenue1632891593050 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME.ReportRevenues,
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'shift',
                        type: 'enum',
                        enum: Object.values(SHIFT),
                        isNullable: true,
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: Object.values(AcceptStatus),
                        isNullable: true,
                    },
                    {
                        name: 'shiftLeaderId',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'cashAtBeginningOfShift',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'cashAtEndingOfShift',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'bankingRevenue',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'billingRevenue',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'differenceRevenue',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'billingCount',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'date',
                        type: 'timestamp',
                    },
                    {
                        name: 'note',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'deletedAt',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'createdBy',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'updatedBy',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'deletedBy',
                        type: 'int',
                        isNullable: true,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(TABLE_NAME.ReportRevenues);
    }
}
