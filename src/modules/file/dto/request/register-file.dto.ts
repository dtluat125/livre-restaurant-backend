import * as Joi from 'joi';
import {
    INPUT_TEXT_MAX_LENGTH,
    TEXTAREA_MAX_LENGTH,
} from 'src/common/constants';
import { MAX_SIZE_FILE } from '../../file.constants';
export class RegisterFileDto {
    readonly fileName: string;
    readonly originalName: string;
    readonly path: string;
    readonly extension: string;
    readonly mimetype: string;
    readonly size: number;
    url: string;
    createdBy?: number;
}

export const registerFileSchema = Joi.object().keys({
    path: Joi.string().max(TEXTAREA_MAX_LENGTH).required(),
    fileName: Joi.string().max(INPUT_TEXT_MAX_LENGTH).required(),
    originalName: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional(),
    extension: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional(),
    mimetype: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional(),
    size: Joi.number().strict().min(0).max(MAX_SIZE_FILE).optional(),
});

export class PresignedUrlQueryDto {
    path: string;
    originalName: string;
}

export const PresignedUrlQuerySchema = Joi.object({
    path: Joi.string().required(),
    originalName: Joi.string().required(),
});
