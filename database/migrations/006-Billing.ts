import {
    BillingStatus,
    PaymentMethod,
    ReasonCanceled,
} from '../../src/modules/billing/billing.constant';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TABLE_NAME } from '../constant';

export class Billing1632891593012 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME.Billings,
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'customerName',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'customerPhone',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'tableId',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'cashierId',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'paymentTotal',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'paymentMethod',
                        type: 'enum',
                        enum: Object.values(PaymentMethod),
                    },
                    {
                        name: 'paymentTime',
                        type: 'datetime',
                        isNullable: true,
                    },
                    {
                        name: 'arrivalTime',
                        type: 'datetime',
                        isNullable: true,
                    },
                    {
                        name: 'billingStatus',
                        type: 'enum',
                        enum: Object.values(BillingStatus),
                    },
                    {
                        name: 'reasonCanceled',
                        type: 'enum',
                        enum: Object.values(ReasonCanceled),
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
        await queryRunner.dropTable(TABLE_NAME.Billings);
    }
}
