import { FloorRestaurant } from './../tableDiagram.constant';
import { TableStatus } from '../tableDiagram.constant';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Billing } from 'src/modules/billing/entity/billing.entity';

@Entity({ name: 'tables_restaurants' })
export class TablesRestaurant extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, nullable: false })
    name: string;

    @Column({
        type: 'enum',
        enum: TableStatus,
        nullable: true,
    })
    status: TableStatus;

    @Column({ type: 'datetime', nullable: true })
    arrivalTime: Date;

    @Column({ nullable: true })
    numberSeat: number;

    @Column({
        type: 'enum',
        enum: FloorRestaurant,
        nullable: true,
    })
    floor: FloorRestaurant;
}
