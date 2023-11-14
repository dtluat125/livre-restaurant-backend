import * as Joi from 'joi';
import { INPUT_TEXT_MAX_LENGTH } from '../../../../common/constants';

export class PresignedUrlDto {
    readonly path: string;
    readonly fileName: string;
}

export const getPresignedUrlSchema = Joi.object().keys({
    path: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional().allow(null),
    fileName: Joi.string().max(INPUT_TEXT_MAX_LENGTH).required(),
});
