import { BillingStatus, PaymentMethod } from './../billing.constant';
import { User } from './../../user/entity/user.entity';
import { ReasonCanceled } from '../billing.constant';
import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/BaseEntity';
import { TablesRestaurant } from 'src/modules/table-diagram/entity/tablesRestaurant.entity';

@Entity({ name: 'billings' })
export class Billing extends BaseEntity {
    @Column({ length: 2000, nullable: true })
    customerName: string;

    @Column({ length: 255, nullable: true })
    customerPhone: string;

    @Column({ nullable: true })
    tableId: number;

    @ManyToOne(() => TablesRestaurant)
    @JoinColumn({
        name: 'tableId',
    })
    table: TablesRestaurant;

    @Column({ nullable: true })
    cashierId: number;

    @ManyToOne(() => User)
    @JoinColumn({
        name: 'cashierId',
    })
    cashier: User;

    @Column({ nullable: true })
    paymentTotal: number;

    @Column({ nullable: true })
    paymentMethod: PaymentMethod;

    @Column({ nullable: true })
    paymentTime: Date;

    @Column({ nullable: true })
    arrivalTime: Date;

    @Column({ nullable: true })
    billingStatus: BillingStatus;

    @Column({ nullable: true })
    reasonCanceled: ReasonCanceled;

    @Column({ length: 2000, nullable: true })
    note: string;
}
