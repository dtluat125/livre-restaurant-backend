import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';
import {
    TEXTAREA_MAX_LENGTH,
    INPUT_TEXT_MAX_LENGTH,
    INPUT_MIN_DATE,
    INPUT_PHONE_MAX_LENGTH,
    REGEX,
    MAX_INTEGER,
    DATE_TIME_FORMAT,
} from '../../common/constants';
const Joi = BaseJoi.extend(JoiDate);

export enum UserRole {
    USER = 'member',
    ADMIN = 'admin',
    SUPERVISOR = 'supervisor',
}

export enum UserGender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

export enum UserStatus {
    WAITING_FOR_APPROVAL = 'waiting_for_approval',
    INACTIVE = 'inactive',
    ACTIVE = 'active',
}

export const userFields = {
    fullName: Joi.string()
        .max(INPUT_TEXT_MAX_LENGTH)
        .required()
        .label('user.fields.fullName'),
    phoneNumber: Joi.string()
        .allow(null)
        .regex(RegExp(REGEX.PHONE_NUMBER))
        .max(INPUT_PHONE_MAX_LENGTH)
        .optional()
        .label('user.fields.phoneNumber'),
    birthday: Joi.date()
        .allow(null)
        .format(DATE_TIME_FORMAT.YYYY_MM_DD_HYPHEN_HH_MM_SS_COLON)
        .min(INPUT_MIN_DATE)
        .less('now')
        .optional()
        .label('user.fields.birthday'),
    address: Joi.string()
        .allow(null)
        .allow('')
        .max(TEXTAREA_MAX_LENGTH)
        .optional()
        .label('user.fields.address'),
    gender: Joi.string()
        .allow(null)
        .valid(UserGender.FEMALE, UserGender.MALE, UserGender.OTHER)
        .optional()
        .label('user.fields.gender'),
    roleId: Joi.number()
        .positive()
        .max(MAX_INTEGER)
        .required()
        .label('user.fields.role'),
    provinceId: Joi.number()
        .positive()
        .max(MAX_INTEGER)
        .required()
        .label('user.fields.province'),
    avatarId: Joi.number()
        .positive()
        .max(MAX_INTEGER)
        .optional()
        .allow(null)
        .label('user.fields.avatarId'),
    note: Joi.string().allow(null, '').max(TEXTAREA_MAX_LENGTH).optional(),
    position: Joi.string().required().label('user.fields.position'),
};

export const AllowUpdateStatus = {
    [UserStatus.WAITING_FOR_APPROVAL]: [UserStatus.ACTIVE, UserStatus.INACTIVE],
    [UserStatus.ACTIVE]: [UserStatus.INACTIVE],
    [UserStatus.INACTIVE]: [UserStatus.ACTIVE],
};

export const excel = ['xls', 'xlsx', 'csv'];

export const userListAttributes = [
    'users.id',
    'users.fullName',
    'users.email',
    'users.phoneNumber',
    'users.birthday',
    'users.gender',
    'users.position',
    'users.role',
    'users.address',
    'users.province',
    'file.fileName',
    'users.lastLoginAt',
    'users.createdAt',
    'users.status',
    'users.note',
    'file.id',
    'position',
];

export enum UserOrderBy {
    CREATED_AT = 'createdAt',
    FULL_NAME = 'fullName',
    STATUS = 'status',
}
