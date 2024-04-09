import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TableStatus } from '../tableDiagram.constant';
import { FloorRestaurant } from './../tableDiagram.constant';

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

    @Column('decimal', {
        nullable: true,
        precision: 10,
        scale: 5,
    })
    coordinateX: number;

    @Column('decimal', {
        nullable: true,
        precision: 10,
        scale: 5,
    })
    coordinateY: number;
}
