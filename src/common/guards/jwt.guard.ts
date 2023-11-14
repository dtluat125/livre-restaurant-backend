import {
    Injectable,
    ExecutionContext,
    UnauthorizedException,
    CanActivate,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AUTHORIZATION_TYPE } from '../../modules/auth/auth.constant';
import { extractToken } from '../helpers/common.function';
import { ConfigService } from '@nestjs/config';
import ConfigKey from '../config/config-key';

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(
        private readonly configService: ConfigService,
        private jwtService: JwtService,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = extractToken(request.headers.authorization || '');
        if (!token) {
            throw new UnauthorizedException();
        }

        request.loginUser = await this.validateToken(
            token,
            request.authorizationType === AUTHORIZATION_TYPE,
        );
        return true;
    }

    async validateToken(token: string, isRefreshToken = false) {
        try {
            if (isRefreshToken) {
                return await this.jwtService.verify(token, {
                    secret: this.configService.get(
                        ConfigKey.JWT_SECRET_REFRESH_TOKEN_KEY,
                    ),
                    ignoreExpiration: false,
                });
            } else {
                return await this.jwtService.verify(token, {
                    secret: this.configService.get(
                        ConfigKey.JWT_SECRET_ACCESS_TOKEN_KEY,
                    ),
                    ignoreExpiration: false,
                });
            }
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}
