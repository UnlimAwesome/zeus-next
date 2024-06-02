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
    keys: { privateKey: string; publicKey: string };
    userId: string;
}
