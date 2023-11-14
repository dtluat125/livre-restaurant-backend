import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { TABLE_NAME } from '../constant';
import {
    BillingStatus,
    PaymentMethod,
} from '../../src/modules/billing/billing.constant';
dotenv.config();

export class BillingSeeder1724329509103 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const billings = [
            {
                customerName: 'Chu sở Lâm',
                customerPhone: '0984864713',
                tableId: 1,
                cashierId: 1,
                paymentTotal: 1200000,
                paymentMethod: PaymentMethod.BANKING,
                paymentTime: '2022-06-25 10:00:00',
                arrivalTime: '2022-04-04 9:00:00',
                billingStatus: BillingStatus.PAID,
                note: 'ahihi',
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy: 1,
                updatedBy: 1,
            },
            {
                customerName: 'Tô Mộc Tranh',
                customerPhone: '09842312533',
                tableId: 2,
                cashierId: 1,
                paymentTotal: 320000,
                paymentMethod: PaymentMethod.READY_CASH,
                paymentTime: '2022-06-25 10:00:00',
                arrivalTime: '2022-04-04 9:00:00',
                billingStatus: BillingStatus.PAID,
                note: 'ahihi',
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy: 1,
                updatedBy: 1,
            },
        ];
        await queryRunner.manager
            .getRepository(TABLE_NAME.Billings)
            .insert(billings);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.getRepository(TABLE_NAME.Billings).delete({});
    }
}
