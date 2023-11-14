import * as Joi from 'joi';
import { TEXTAREA_MAX_LENGTH } from 'src/common/constants';

export const GoogleLoginSchema = Joi.object({
    code: Joi.string().required().label('auth.fields.google.code'),
    redirectUri: Joi.string()
        .max(TEXTAREA_MAX_LENGTH)
        .uri()
        .required()
        .label('auth.fields.google.redirectUri'),
});
export class GoogleLoginDto {
    readonly code: string;
    readonly redirectUri: string;
}
