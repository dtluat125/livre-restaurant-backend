export enum LANGUAGES {
    EN = 'en',
    VI = 'vi',
}

export enum NODE_ENV {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
    TEST = 'test',
    PROVISION = 'provision',
}

export enum ORDER_DIRECTION {
    ASC = 'asc',
    DESC = 'desc',
}
export type TYPE_ORM_ORDER_DIRECTION = 'ASC' | 'DESC';

export enum USER_ACTION {
    POST = 'create',
    PATCH = 'update',
    DELETE = 'delete',
}

export enum HTTP_METHOTDS {
    POST = 'post',
    PATCH = 'patch',
    DELETE = 'delete',
}
export enum DATE_TIME_FORMAT {
    YYYY_MM_DD_HYPHEN = 'YYYY-MM-DD',
    HH_MM_SS_CONLON = 'HH:mm:ss',
    YYYY_MM_DD_HYPHEN_HH_MM_SS_COLON = 'YYYY-MM-DD HH:mm:ss',
    YYYY_MM_DD_HYPHEN_HH_MM_COLON = 'YYYY-MM-DD HH:mm',
    YYYY_MM_DD = 'YYYYMMDD',
    SENDGRID_DATE_FORMAT = 'HH:mm [ngày] DD/MM/YYYY',
}

export const APPROVED = { TRUE: 1, FALSE: 0 };

export const DEFAULT_FIRST_PAGE = 1;
export const DEFAULT_LIMIT_FOR_DROPDOWN = 1000;
export const DEFAULT_LIMIT_FOR_PAGINATION = 10;
export const DEFAULT_LIMIT_FOR_GROUP = 1000;
export const DEFAULT_ORDER_BY = 'createdAt';
export const DEFAULT_ORDER_DIRECTION = ORDER_DIRECTION.DESC;

export const MIN_PAGE_SIZE = 0;
export const MIN_PAGE = 1;
export const MAX_PAGE_SIZE = 10000;
export const MAX_PAGE = 10000;

export const INPUT_MIN_DATE = '1800-01-01';

export const INPUT_TEXT_MAX_LENGTH = 255;
export const INPUT_URL_MAX_LENGTH = 2500;
export const INPUT_PHONE_MAX_LENGTH = 11;

export const TEXTAREA_MAX_LENGTH = 2000;

export const REGEX = {
    EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,20}$/,
    PHONE_NUMBER: /^([0-9]){10,11}$/,
    YYYY_MM: /^\d{4}-(0[1-9]|1[0-2])$/,
    URL: /^https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/,
};

export const DAYS_PER_WEEK = 7;

export const SECONDS_PER_DAY = 86400;

export const SECONDS_PER_FIVE_DAYS = 5 * SECONDS_PER_DAY;

export const MAX_CITIZEN_ID_LENGTH = 12;
export const MIN_CITIZEN_ID_LENGTH = 9;

export const MAX_BANK_ACCOUNT_LENGTH = 14;
export const MIN_BANK_ACCOUNT_LENGTH = 8;

export const MAX_SOCIAL_INSURANCE_LENGTH = 13;
export const MIN_SOCIAL_INSURANCE_LENGTH = 10;

export const MAX_TAX_CODE_LENGTH = 13;
export const MIN_TAX_CODE_LENGTH = 10;

export const FINGER_SCANNER_DATA_KEY = 'LAST_DAY_DOWNLOAD_FINGER_SCANNER_DATA';

export const MAX_LENGTH_DAYS_OF_MONTH = 31;

export const MAX_LENGTH_MONTH = 12;
export const MIN_LENGTH_MONTH = 1;

export const ARRAY_MAX_LENGTH = 10000;

export const MINUTES_PER_HOUR = 60;

export enum LOG_LEVEL {
    DEBUG = 'debug',
    ALL = 'all',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    FATAL = 'fatal',
    OFF = 'off',
    TRACE = 'trace',
}

export const TIMEZONE_HEADER = 'x-timezone';
export const TIMEZONE_DEFAULT = '+07:00';
export const TIMEZONE_NAME_HEADER = 'x-timezone-name';
export const TIMEZONE_NAME_DEFAULT = 'Asia/Bangkok';

export const MAX_INTEGER = 4294967295;

export const BLOCK_TIME_BOOKING = 3600;

export enum HttpStatus {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    INVALID_USERNAME_OR_PASSWORD = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    UNSUPPORTED_MEDIA_TYPE = 415,
    UNPROCESSABLE_ENTITY = 422,
    ITEM_NOT_FOUND = 444,
    ITEM_ALREADY_EXIST = 445,
    ITEM_IS_USING = 446,
    INTERNAL_SERVER_ERROR = 500,
    OVER_LIMIT = 447,
}
