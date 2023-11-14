export interface ILoginBody {
    email: string;
    password: string;
}
export interface IGoogleLoginBody {
    code: string;
    redirectUri: string;
}

export interface IGoogleLoginLinkQuery {
    state: string;
    redirectUri: string;
}
