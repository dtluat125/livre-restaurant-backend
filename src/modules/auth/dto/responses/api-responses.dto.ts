import { ApiResponse } from '../../../../common/helpers/api.response';

import { User } from '../../../user/entity/user.entity';

export interface ITokenInfo {
    token: string;
    expiresIn: number;
}
export class UserWithToken {
    profile: User;
    accessToken: ITokenInfo;
    refreshToken: ITokenInfo;
}
export class UserLoginResult extends ApiResponse<UserWithToken> {
    data: UserWithToken;
}

export class GoogleLoginLinkResult extends ApiResponse<
    Record<string, unknown>
> {
    link: string;
    redirectUri: string;
}

export class UpdateProfileResult extends ApiResponse<Record<string, unknown>> {
    data: Record<string, unknown>;
}

export class UserProfileResult extends ApiResponse<User> {
    data: User;
}

export class UserLogoutResult extends ApiResponse<boolean> {
    data: boolean;
}

export class RefreshTokenResult extends ApiResponse<UserWithToken> {
    data: UserWithToken;
}
