import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';
import { USER_ACTION } from '../../../common/constants';

@Entity({ name: 'user_logging' })
export class UserLogging {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    userId: number;

    @Column({
        type: 'enum',
        enum: USER_ACTION,
        nullable: false,
        default: USER_ACTION.POST,
    })
    action: USER_ACTION;

    @Column({ type: 'json', nullable: true })
    oldValue: JSON;

    @Column({ type: 'json', nullable: true })
    newValue: JSON;

    @Column({ length: 2000, nullable: false })
    description?: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}
