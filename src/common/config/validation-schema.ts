import * as Joi from 'joi';
import ConfigKey from './config-key';
import { NODE_ENV, LOG_LEVEL } from '../constants';

export default Joi.object({
    [ConfigKey.NODE_ENV]: Joi.string()
        .required()
        .valid(
            NODE_ENV.DEVELOPMENT,
            NODE_ENV.PRODUCTION,
            NODE_ENV.PROVISION,
            NODE_ENV.TEST,
        ),
    [ConfigKey.PORT]: Joi.number().default(3000),
    [ConfigKey.BASE_PATH]: Joi.string().required(),

    [ConfigKey.LOG_LEVEL]: Joi.string()
        .default(LOG_LEVEL.DEBUG)
        .valid(
            LOG_LEVEL.ALL,
            LOG_LEVEL.DEBUG,
            LOG_LEVEL.ERROR,
            LOG_LEVEL.FATAL,
            LOG_LEVEL.INFO,
            LOG_LEVEL.OFF,
            LOG_LEVEL.TRACE,
            LOG_LEVEL.WARN,
        ),
    [ConfigKey.LOG_ROOT_FOLDER]: Joi.string().default('logs'),
    [ConfigKey.DB_HOST]: Joi.string().required(),
    [ConfigKey.DB_PORT]: Joi.number().required(),
    [ConfigKey.DB_USERNAME]: Joi.string().required(),
    [ConfigKey.DB_PASSWORD]: Joi.string().required().allow(null, ''),
    [ConfigKey.DB_NAME]: Joi.string().required(),

    [ConfigKey.JWT_SECRET_ACCESS_TOKEN_KEY]: Joi.string().required(),
    [ConfigKey.JWT_SECRET_REFRESH_TOKEN_KEY]: Joi.string().required(),
    [ConfigKey.TOKEN_EXPIRED_IN]: Joi.number().required(),
    [ConfigKey.REFRESH_TOKEN_EXPIRED_IN]: Joi.number().required(),

    [ConfigKey.CORS_WHITE_LIST]: Joi.string().required(),

    [ConfigKey.GOOGLE_CLIENT_ID]: Joi.string().required(),
    [ConfigKey.GOOGLE_CLIENT_SECRET]: Joi.string().required(),

    [ConfigKey.AWS_ACCESS_KEY_ID]: Joi.string().required(),
    [ConfigKey.AWS_SECRET_ACCESS_KEY]: Joi.string().required(),
    [ConfigKey.AWS_REGION]: Joi.string().required(),
    [ConfigKey.AWS_S3_BUCKET]: Joi.string().required(),
    [ConfigKey.AWS_S3_DOMAIN]: Joi.string().required(),
});
