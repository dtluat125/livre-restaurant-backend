import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import intersection from 'lodash/intersection';

export const Permissions = (permissions: string[]) =>
    SetMetadata('permissions', permissions);

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const routeRequiredPermissions = this.reflector.get<string[]>(
            'permissions',
            context.getHandler(),
        );
        try {
            const user = request.loginUser;
            if (user.isSuperAdmin) {
                return true;
            }

            // this route unneed any permission
            if (
                !routeRequiredPermissions ||
                routeRequiredPermissions?.length === 0
            ) {
                return true;
            }

            const loginUserPermissions: string[] = [];
            user.role.permissions
                .filter((item) => item)
                .forEach((item) => {
                    loginUserPermissions.push(
                        `${item.resource.content}_${item.action.content}`,
                    );
                });
            return (
                intersection(loginUserPermissions, routeRequiredPermissions)
                    .length > 0
            );
        } catch (error) {
            throw new ForbiddenException();
        }
    }
}
