import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'files' })
export class File extends BaseEntity {
    @Column({ length: 255, nullable: false })
    fileName: string;

    @Column({ length: 255, nullable: false })
    originalName: string;

    @Column({ length: 255, nullable: false })
    path: string;

    @Column({ length: 255, nullable: false })
    extension: string;

    @Column({ length: 255, nullable: false })
    mimetype: string;

    @Column({ nullable: false })
    size: number;
}
