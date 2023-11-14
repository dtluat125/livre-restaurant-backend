import Joi from 'joi';
import {
    MAX_PAGE,
    MAX_PAGE_SIZE,
    MIN_PAGE,
    MIN_PAGE_SIZE,
} from 'src/common/constants';
import { UserStatus } from 'src/modules/user/user.constant';
import {
    WITH_DELETED_OPTION,
    WITH_INACTIVE_OPTION,
    WITH_WAITING_FOR_APPROVAL_OPTION,
} from '../../common.constant';

export class QueryDropdown {
    page?: number;
    limit?: number;
    status?: UserStatus[];
    withDeleted?: WITH_DELETED_OPTION;
    withInactive?: WITH_INACTIVE_OPTION;
    withWaitingForApproval?: WITH_WAITING_FOR_APPROVAL_OPTION;
    tableId?: number;
}

export const queryDropdownSchema = Joi.object().keys({
    page: Joi.number().allow(null).min(MIN_PAGE).max(MAX_PAGE).optional(),
    limit: Joi.number()
        .allow(null)
        .min(MIN_PAGE_SIZE)
        .max(MAX_PAGE_SIZE)
        .optional(),
    status: Joi.array()
        .items(Joi.string().valid(...Object.values(UserStatus)))
        .optional()
        .allow(null, ''),
    withDeleted: Joi.number()
        .valid(...Object.values(WITH_DELETED_OPTION))
        .allow(null, '')
        .optional(),
    withInactive: Joi.number()
        .valid(...Object.values(WITH_INACTIVE_OPTION))
        .allow(null, '')
        .optional(),
    tableId: Joi.number().allow(null).optional(),
});
