import { Injectable, PipeTransform } from '@nestjs/common';
import trim from 'lodash/trim';

@Injectable()
export class RemoveEmptyQueryPipe implements PipeTransform {
    removeEmptyValue(query: any): void {
        const removeEmpty = (item: any) => {
            const attributeNames = Object.keys(item);
            attributeNames.forEach((attributeName) => {
                if (!trim(query[attributeName] as string)) {
                    delete query[attributeName];
                }
            });
        };

        removeEmpty(query);
    }

    transform(query: any) {
        this.removeEmptyValue(query);
        return query;
    }
}
