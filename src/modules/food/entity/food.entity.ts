import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Category } from 'src/modules/category/entity/category.entity';
import { File } from 'src/modules/file/entity/file.entity';

@Entity({ name: 'foods' })
export class Food extends BaseEntity {
    @Column({ length: 2000, nullable: true })
    foodName: string;

    @Column({ nullable: true })
    foodImgId: number;

    @ManyToOne(() => File)
    @JoinColumn({
        name: 'foodImgId',
    })
    foodImgFile: File;

    @Column({ nullable: true })
    price: number;

    @Column({ nullable: true })
    categoryId: number;

    @ManyToOne(() => Category)
    @JoinColumn({
        name: 'categoryId',
    })
    category: Category;
}
