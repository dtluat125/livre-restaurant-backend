import { Global, Module } from '@nestjs/common';
import {
    I18nModule as NestI18nModule,
    I18nJsonParser,
    AcceptLanguageResolver,
} from 'nestjs-i18n';
import * as path from 'path';

@Global()
@Module({
    imports: [
        NestI18nModule.forRoot({
            fallbackLanguage: 'en',
            parserOptions: {
                path: path.join('dist/i18n/'),
                watch: true,
            },
            parser: I18nJsonParser,
            resolvers: [AcceptLanguageResolver],
        }),
    ],
    controllers: [],
    providers: [],
})
export class I18nModule {}
