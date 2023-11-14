import { AcceptStatus } from './../../common/common.constant';
import { SHIFT } from '../report_revenue.constant';
import { User } from 'src/modules/user/entity/user.entity';
import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/BaseEntity';

@Entity({ name: 'report_revenues' })
export class ReportRevenue extends BaseEntity {
    @Column({ nullable: true })
    shift: SHIFT;

    @Column({ nullable: true })
    shiftLeaderId: number;

    @ManyToOne(() => User)
    @JoinColumn({
        name: 'shiftLeaderId',
    })
    shiftLeader: User;

    @Column({ nullable: true })
    cashAtBeginningOfShift: number;

    @Column({ nullable: true })
    billingRevenue: number;

    @Column({ nullable: true })
    cashAtEndingOfShift: number;

    @Column({ nullable: true })
    bankingRevenue: number;

    @Column({ nullable: true })
    differenceRevenue: number;

    @Column({ length: 2000, nullable: true })
    note: string;

    @Column({ type: 'timestamp', nullable: true })
    date: Date;

    @Column({ nullable: true })
    billingCount: number;

    @Column({ nullable: true })
    status: AcceptStatus;
}
