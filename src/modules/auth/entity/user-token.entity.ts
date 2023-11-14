import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { UserTokenType } from '../auth.constant';

@Entity({ name: 'user_tokens' })
export class UserToken extends BaseEntity {
    @Column()
    userId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user?: User;

    // hash token value to find faster
    @Column({ length: 2000 })
    hashToken: string;

    @Column({ type: 'blob' })
    token: string;

    @Column({
        type: 'enum',
        enum: UserTokenType,
        default: UserTokenType.REFRESH_TOKEN,
    })
    type: UserTokenType;
}
