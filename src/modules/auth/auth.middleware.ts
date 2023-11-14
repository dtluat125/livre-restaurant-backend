import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { AUTHORIZATION_TYPE } from './auth.constant';

interface IRefreshTokenRequest extends Request {
    authorizationType: string;
}
@Injectable()
export class RefreshTokenMiddleware implements NestMiddleware {
    use(req: IRefreshTokenRequest, res: Response, next: NextFunction) {
        req.authorizationType = AUTHORIZATION_TYPE;
        return next();
    }
}
