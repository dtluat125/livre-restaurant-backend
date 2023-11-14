import {
    Global,
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { AuthController } from './auth.controller';
import { CommonModule } from '../common/common.module';
import { RefreshTokenMiddleware } from './auth.middleware';
import { I18nModule } from 'nestjs-i18n';
import ConfigKey from '../../../src/common/config/config-key';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from 'src/common/services/database.service';
import { UserService } from '../user/services/user.service';

@Global()
@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get(
                    ConfigKey.JWT_SECRET_ACCESS_TOKEN_KEY,
                ),
                signOptions: {
                    expiresIn: configService.get(ConfigKey.TOKEN_EXPIRED_IN),
                },
            }),
        }),
        CommonModule,
        I18nModule,
    ],
    providers: [AuthService, JwtGuard, DatabaseService, UserService],
    controllers: [AuthController],
    exports: [AuthService, JwtModule, JwtGuard],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RefreshTokenMiddleware).forRoutes({
            path: '/auth/refresh-token',
            method: RequestMethod.POST,
        });
    }
}
