import { UserStatus } from '../../user.constant';
import * as Joi from 'joi';
export const UserStatusSchema = Joi.object().keys({
    status: Joi.string()
        .valid(...Object.values(UserStatus))
        .required(),
});

export class UserStatusDto {
    status: UserStatus;
}
