import Joi from 'joi';
import { INPUT_TEXT_MAX_LENGTH, LANGUAGES } from 'src/common/constants';
import { SettingKey } from '../../setting.constant';

export class GeneralSettingValueDto {
    code: string;
    value: Record<LANGUAGES, string>;
}

export class GeneralSettingDto<T> {
    id: number;
    key: SettingKey;
    values: T[];
}

export class GeneralSettingListQueryStringDto {
    key: SettingKey;
}

export const generalSettingValueSchema = Joi.object().keys({
    code: Joi.string().max(INPUT_TEXT_MAX_LENGTH).required().label('code'),
    value: Joi.object().required().label('value'),
});

export const settingSchema = Joi.object().keys({
    key: Joi.string()
        .valid(...Object.values(SettingKey))
        .required()
        .label('key'),
    values: Joi.array().items(generalSettingValueSchema),
});

export const settingQueryStringSchema = Joi.object().keys({
    key: Joi.string()
        .valid(...Object.values(SettingKey))
        .required()
        .label('key'),
});
