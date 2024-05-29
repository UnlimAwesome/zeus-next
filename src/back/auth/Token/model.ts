export interface AuthData {
    clientId: string;
    authorizationCode: string;
    codeExpiresAt: Date;
    userId: string;
    accessToken?: string;
    accessTokenExpiresAt?: Date;
}

export interface SecretData {
    clientId: string;
    secret: string;
    userId: string;
}
