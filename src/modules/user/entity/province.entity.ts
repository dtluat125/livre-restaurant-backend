import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'provinces' })
export class Province extends BaseEntity {
    @Column({ length: 255, nullable: false })
    name: string;

    @Column({ length: 255, nullable: true })
    description: string;

    @Column({ nullable: false, default: 0 })
    order: number;
}
