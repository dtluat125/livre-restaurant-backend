import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import {
    appendPermissionToRole,
    generateHashToken,
} from '../../../common/helpers/common.function';
import { IGoogleLoginLinkQuery } from '../auth.interface';
import { OAuth2Client } from 'google-auth-library';
import { GoogleLoginLinkParameters } from '../auth.constant';
import { UpdateProfileDto } from '../dto/requests/update-profile.dto';
import { DatabaseService } from 'src/common/services/database.service';
import { ConfigService } from '@nestjs/config';
import ConfigKey from '../../../../src/common/config/config-key';
import { User } from 'src/modules/user/entity/user.entity';
import { UserToken } from '../entity/user-token.entity';
import { Role } from 'src/modules/role/entity/role.entity';
import { RolePermission } from 'src/modules/role/entity/rolePermissionRelation.entity';

export const usersAttributes: (keyof User)[] = [
    'id',
    'email',
    'fullName',
    'phoneNumber',
    'address',
    'birthday',
    'gender',
    'role',
    'status',
    'isSuperAdmin',
];

@Injectable()
export class AuthService {
    constructor(
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly databaseService: DatabaseService,
    ) {}
    /**
     *
     * @param user
     * @return accessToken & accessTokenExpiredIn
     */
    private generateAccessToken(user: User) {
        const accessTokenExpiredIn = this.configService.get(
            ConfigKey.TOKEN_EXPIRED_IN,
        );
        const secretAccessTokenKey = this.configService.get(
            ConfigKey.JWT_SECRET_ACCESS_TOKEN_KEY,
        );
        const accessTokenOptions = {
            secret: secretAccessTokenKey,
            expiresIn: accessTokenExpiredIn,
        };
        const payloadAccessToken = {
            id: user.id,
            email: user.email,
            role: user.role,
            isSuperAdmin: user.isSuperAdmin,
            expiresIn: accessTokenExpiredIn,
        };
        const accessToken = this.jwtService.sign(
            payloadAccessToken,
            accessTokenOptions,
        );
        return {
            token: accessToken,
            expiresIn: accessTokenExpiredIn,
        };
    }
    /**
     *
     * @param user
     * @param hashToken
     * @return refreshToken && refreshTokenExpiredIn
     */
    private generateRefreshToken(user: User, hashToken: string) {
        const refreshTokenExpiredIn = this.configService.get(
            ConfigKey.REFRESH_TOKEN_EXPIRED_IN,
        );
        const secretRefreshTokenKey = this.configService.get(
            ConfigKey.JWT_SECRET_REFRESH_TOKEN_KEY,
        );
        const accessTokenOptions = {
            secret: secretRefreshTokenKey,
            expiresIn: refreshTokenExpiredIn,
        };

        const payloadAccessToken = {
            id: user.id,
            email: user.email,
            role: user.role,
            isSuperAdmin: user.isSuperAdmin,
            expiresIn: refreshTokenExpiredIn,
            hashToken,
        };
        const refreshToken = this.jwtService.sign(
            payloadAccessToken,
            accessTokenOptions,
        );
        return {
            token: refreshToken,
            expiresIn: refreshTokenExpiredIn,
        };
    }

    /**
     *
     * @param user User
     * @returns {user, accessToken, refreshToken}
     */

    public async login(user: User) {
        try {
            const accessToken = this.generateAccessToken(user);
            const hashToken = generateHashToken(user.id);
            const refreshToken = this.generateRefreshToken(user, hashToken);
            await this.dbManager.transaction(async (transactionManager) => {
                // add refresh token to user_tokens table.
                await transactionManager.save(UserToken, {
                    user,
                    token: refreshToken.token,
                    hashToken,
                });
                // update lastLoginAt for user
                await transactionManager.update(
                    User,
                    { id: user.id },
                    { lastLoginAt: new Date() },
                );
            });

            return {
                user,
                accessToken,
                refreshToken,
            };
        } catch (error) {
            throw error;
        }
    }

    public async appendRoleToUser(user: User) {
        const role = await this.dbManager
            .createQueryBuilder(Role, 'role')
            .leftJoinAndMapMany(
                'role.rolePermissions',
                RolePermission,
                'rolePermission',
                'rolePermission.roleId = role.id',
            )
            .where('role.id = :userId', { userId: user.roleId })
            .select([
                'role.id',
                'role.name',
                'role.description',
                'rolePermission.permissionId',
            ])
            .getOne();
        appendPermissionToRole(role);
        user.role = role;
    }

    public async getUserByEmail(email: string, attributes = usersAttributes) {
        try {
            const user = await this.dbManager.findOne(User, {
                select: attributes,
                where: { email },
                relations: ['role'],
            });
            return user;
        } catch (error) {
            throw error;
        }
    }

    public getGoogleLink(
        query: IGoogleLoginLinkQuery,
        scope = GoogleLoginLinkParameters.scope,
        responseType = GoogleLoginLinkParameters.responseType,
        accessType = GoogleLoginLinkParameters.accessType,
        prompt = GoogleLoginLinkParameters.prompt,
    ) {
        try {
            const clientSecret = this.configService.get(
                ConfigKey.GOOGLE_CLIENT_SECRET,
            );
            const clientId = this.configService.get(ConfigKey.GOOGLE_CLIENT_ID);
            const googleClient = new OAuth2Client({ clientSecret, clientId });
            const googleLoginUrl = googleClient.generateAuthUrl({
                state: query.state,
                redirect_uri: query.redirectUri,
                scope,
                response_type: responseType,
                access_type: accessType,
                prompt,
            });
            return googleLoginUrl;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    public async getAccessTokenFromCode(
        decodedCode: string,
        redirectUri: string,
    ) {
        try {
            const clientSecret = this.configService.get(
                ConfigKey.GOOGLE_CLIENT_SECRET,
            );
            const clientId = this.configService.get(ConfigKey.GOOGLE_CLIENT_ID);
            const googleClient = new OAuth2Client({ clientSecret, clientId });
            const result = await googleClient.getToken({
                code: decodedCode,
                redirect_uri: redirectUri,
            });

            return result?.tokens?.access_token || '';
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    public async getUserInfoFromAccessToken(accessToken: string) {
        try {
            const clientSecret = this.configService.get(
                ConfigKey.GOOGLE_CLIENT_SECRET,
            );
            const clientId = this.configService.get(ConfigKey.GOOGLE_CLIENT_ID);
            const googleClient = new OAuth2Client({ clientSecret, clientId });
            const { email } = await googleClient.getTokenInfo(accessToken);
            return email;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async updateProfile(body: UpdateProfileDto, id: number) {
        try {
            const result = await this.dbManager.update(User, id, body);
            return result;
        } catch (error) {
            throw error;
        }
    }

    public async findTokensById(id: number) {
        return this.dbManager.find(UserToken, {
            select: ['token'],
            where: {
                userId: id,
            },
        });
    }

    public async logout(user: User): Promise<boolean> {
        try {
            // delete old refresh token
            await this.dbManager.delete(UserToken, { user });
            return true;
        } catch (error) {
            throw error;
        }
    }

    public async refreshToken(user: User) {
        try {
            const accessToken = this.generateAccessToken(user);
            const hashToken = generateHashToken(user.id);
            const refreshToken = this.generateRefreshToken(user, hashToken);
            await this.dbManager.transaction(async (transactionManager) => {
                // delete old refresh token
                await this.dbManager.delete(UserToken, { user });
                // add refresh token to user_tokens table.
                await transactionManager.save(UserToken, {
                    user,
                    token: refreshToken.token,
                    hashToken,
                });
            });
            return {
                user,
                accessToken,
                refreshToken,
            };
        } catch (error) {
            throw error;
        }
    }

    public async checkHashToken(token: string) {
        try {
            const data = await this.jwtService.verify(token, {
                secret: this.configService.get(
                    ConfigKey.JWT_SECRET_REFRESH_TOKEN_KEY,
                ),
            });
            const res = await this.databaseService.checkItemExist(
                UserToken,
                'hashToken',
                data.hashToken,
            );
            return res;
        } catch (error) {
            throw error;
        }
    }
}
