import {
    BadRequestException,
    Injectable,
    PipeTransform,
    Scope,
} from '@nestjs/common';
import { ObjectSchema, ValidationResult, ValidationError } from 'joi';

@Injectable({ scope: Scope.REQUEST })
export class JoiValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) {}

    transform(value) {
        const { error } = this.schema.validate(value, {
            abortEarly: false,
        }) as ValidationResult;
        if (error) {
            const { details } = error as ValidationError;
            throw new BadRequestException({ errors: details });
        }
        return value;
    }
}
