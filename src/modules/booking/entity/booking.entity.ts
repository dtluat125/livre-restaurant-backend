import { BookingStatus } from './../booking.constant';
import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TablesRestaurant } from 'src/modules/table-diagram/entity/tablesRestaurant.entity';

@Entity({ name: 'bookings' })
export class Booking extends BaseEntity {
    @Column({
        type: 'enum',
        enum: BookingStatus,
        nullable: true,
    })
    status: BookingStatus;

    @Column({ length: 255, nullable: true })
    nameCustomer: string;

    @Column({ length: 255, nullable: true })
    phone: string;

    @Column({ nullable: true })
    tableId: number;

    @Column({ nullable: true })
    numberPeople: number;

    @Column({ type: 'datetime', nullable: true })
    arrivalTime: Date;

    @ManyToOne(() => TablesRestaurant)
    @JoinColumn({
        name: 'tableId',
    })
    tablesRestaurant: TablesRestaurant;
}
