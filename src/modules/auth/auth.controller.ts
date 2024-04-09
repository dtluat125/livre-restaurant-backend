import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Query,
    Post,
    Req,
    Request,
    UseGuards,
    UsePipes,
    Patch,
} from '@nestjs/common';
import { LoginDto, LoginSchema } from './dto/requests/login.dto';

import { AuthService, usersAttributes } from './services/auth.service';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { UserStatus } from '../user/user.constant';
import {
    GoogleLoginDto,
    GoogleLoginSchema,
} from './dto/requests/google-login.dto';
import {
    GoogleLoginLinkDto,
    GoogleLoginLinkSchema,
} from './dto/requests/google-login-link.dto';
import { JoiValidationPipe } from '../../common/pipes/joi.validation.pipe';
import { updateProfileSchema } from './dto/requests/update-profile.dto';
import { UpdateProfileDto } from './dto/requests/update-profile.dto';
import { DatabaseService } from '../../common/services/database.service';
import {
    extractToken,
    hasPermission,
} from '../../common/helpers/common.function';
import {
    ErrorResponse,
    SuccessResponse,
} from '../../common/helpers/api.response';
import { User } from '../user/entity/user.entity';
import {
    AuthorizationGuard,
    Permissions,
} from 'src/common/guards/authorization.guard';
import {
    PermissionResources,
    PermissionActions,
} from 'src/modules/role/role.constants';
import { HttpStatus } from 'src/common/constants';
import { IPermissionResponse } from '../role/role.interface';
import { UserService } from '../user/services/user.service';
import { TrimObjectPipe } from 'src/common/pipes/trim.object.pipe';

@Controller({
    path: 'auth',
})
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly i18n: I18nRequestScopeService,
        private readonly databaseService: DatabaseService,
        private readonly userService: UserService,
    ) {}

    @Post('login')
    @UsePipes(new JoiValidationPipe(LoginSchema))
    async login(@Body(new TrimObjectPipe()) data: LoginDto) {
        try {
            const user = await this.authService.getUserByEmail(data.email, [
                ...usersAttributes,
                'password',
            ]);
            // check if user exists?
            if (!user) {
                const message = await this.i18n.translate(
                    'auth.errors.user.notFound',
                );
                return new ErrorResponse(
                    HttpStatus.INVALID_USERNAME_OR_PASSWORD,
                    message,
                    [],
                );
            }
            // check password is correct?
            if (user.password) {
                const isCorrectPassword = await user.validatePassword(
                    data.password,
                );
                if (!isCorrectPassword) {
                    const message = await this.i18n.translate(
                        'auth.errors.user.invalidPwd',
                    );
                    return new ErrorResponse(
                        HttpStatus.INVALID_USERNAME_OR_PASSWORD,
                        message,
                        [],
                    );
                }
            }
            await this.authService.appendRoleToUser(user);
            if (!user.isSuperAdmin) {
                // get permission from user check if user can login
                const permissions = user.role
                    ?.permissions as IPermissionResponse[];
                const canLogin = hasPermission(
                    permissions,
                    PermissionResources.USER,
                    PermissionActions.LOGIN,
                );
                if (!canLogin) {
                    const message = await this.i18n.translate(
                        'auth.errors.user.canNotLogin',
                    );
                    return new ErrorResponse(
                        HttpStatus.UNAUTHORIZED,
                        message,
                        [],
                    );
                }
            }
            // check if user is active?
            if (user.status !== UserStatus.ACTIVE) {
                const message = await this.i18n.translate(
                    'auth.errors.user.inActive',
                );
                return new ErrorResponse(HttpStatus.UNAUTHORIZED, message, []);
            }

            // every thing ok, return success data
            const {
                user: profile,
                accessToken,
                refreshToken,
            } = await this.authService.login(user);
            return new SuccessResponse({ profile, accessToken, refreshToken });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    @Get('google-login-link')
    @UsePipes(new JoiValidationPipe(GoogleLoginLinkSchema))
    async getGoogleLoginLink(@Query() query: GoogleLoginLinkDto) {
        try {
            const link = this.authService.getGoogleLink(query);
            return new SuccessResponse({
                link: link,
                redirectUri: query.redirectUri,
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    @Post('google-login')
    @UsePipes(new JoiValidationPipe(GoogleLoginSchema))
    public async loginWithGoogle(
        @Body(new TrimObjectPipe()) data: GoogleLoginDto,
    ) {
        try {
            const { code = null, redirectUri = null } = data;
            const decodedCode = decodeURIComponent(code);
            const googleAccessToken =
                await this.authService.getAccessTokenFromCode(
                    decodedCode,
                    redirectUri,
                );
            if (!googleAccessToken) {
                const message = await this.i18n.translate(
                    'auth.errors.google.invalidLoginInfo',
                );
                return new ErrorResponse(HttpStatus.UNAUTHORIZED, message, []);
            }
            const userInfoEmail =
                await this.authService.getUserInfoFromAccessToken(
                    googleAccessToken,
                );
            if (!userInfoEmail) {
                const message = await this.i18n.translate(
                    'auth.errors.google.invalidLoginInfo',
                );
                return new ErrorResponse(HttpStatus.UNAUTHORIZED, message, []);
            }
            const user = await this.authService.getUserByEmail(userInfoEmail);
            await this.authService.appendRoleToUser(user);
            console.log(userInfoEmail, user);
            // check if user exists?
            if (!user) {
                const message = await this.i18n.translate(
                    'auth.errors.user.notFound',
                );
                return new ErrorResponse(HttpStatus.UNAUTHORIZED, message, []);
            }
            if (!user.isSuperAdmin) {
                // get permission from user check if user can login
                const permissions = user.role
                    ?.permissions as IPermissionResponse[];
                const canLogin = hasPermission(
                    permissions,
                    PermissionResources.USER,
                    PermissionActions.LOGIN,
                );
                if (!canLogin) {
                    const message = await this.i18n.translate(
                        'auth.errors.user.canNotLogin',
                    );
                    return new ErrorResponse(
                        HttpStatus.UNAUTHORIZED,
                        message,
                        [],
                    );
                }
            }
            // check if user is active?
            if (user.status !== UserStatus.ACTIVE) {
                const message = await this.i18n.translate(
                    'auth.errors.user.inActive',
                );
                return new ErrorResponse(HttpStatus.UNAUTHORIZED, message, []);
            }
            const {
                user: profile,
                accessToken,
                refreshToken,
            } = await this.authService.login(user);
            return new SuccessResponse({ profile, accessToken, refreshToken });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post('refresh-token')
    @UseGuards(JwtGuard, AuthorizationGuard)
    @Permissions([`${PermissionResources.USER}_${PermissionActions.LOGIN}`])
    async refreshToken(@Req() req) {
        try {
            const loginUser = req.loginUser;
            const isHashTokenExist = this.authService.checkHashToken(
                extractToken(req.headers.authorization),
            );
            if (!isHashTokenExist) {
                const message = await this.i18n.translate(
                    'auth.errors.auth.hashToken.notExist',
                );
                return new ErrorResponse(HttpStatus.UNAUTHORIZED, message, []);
            }
            const {
                user: profile,
                accessToken,
                refreshToken,
            } = await this.authService.refreshToken(loginUser);

            return new SuccessResponse({ profile, accessToken, refreshToken });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('profile')
    @UseGuards(JwtGuard, AuthorizationGuard)
    @Permissions([`${PermissionResources.USER}_${PermissionActions.LOGIN}`])
    async profile(@Request() req) {
        try {
            const profile = await this.userService.getUserById(
                req.loginUser?.id,
            );
            if (!profile) {
                const message = await this.i18n.translate(
                    'auth.errors.user.notFound',
                );
                return new ErrorResponse(HttpStatus.NOT_FOUND, message, []);
            }
            return new SuccessResponse(profile);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Patch('profile')
    @UsePipes(new JoiValidationPipe(updateProfileSchema))
    @UseGuards(JwtGuard, AuthorizationGuard)
    @Permissions([`${PermissionResources.USER}_${PermissionActions.LOGIN}`])
    async updateProfile(
        @Request() req,
        @Body(new TrimObjectPipe()) body: UpdateProfileDto,
    ) {
        try {
            const profile = await this.userService.getUserById(
                req.loginUser?.id,
            );
            if (!profile) {
                const message = await this.i18n.translate(
                    'auth.errors.user.notFound',
                );
                return new ErrorResponse(HttpStatus.NOT_FOUND, message, []);
            }

            const result = await this.authService.updateProfile(
                body,
                req.loginUser?.id,
            );
            return new SuccessResponse(
                result as unknown as Record<string, unknown>,
            );
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post('logout')
    @UseGuards(JwtGuard)
    async logout(@Request() req) {
        try {
            const result = await this.authService.logout(req.user);
            return new SuccessResponse(result);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
