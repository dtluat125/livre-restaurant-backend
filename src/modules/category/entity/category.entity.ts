import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'categories' })
export class Category extends BaseEntity {
    @Column({ length: 255, nullable: false })
    name: string;

    @Column({ length: 2000, nullable: true })
    note: string;

    @Column({ nullable: true })
    priority: number;
}
