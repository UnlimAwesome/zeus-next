import { authDataMock, secretDataMock } from './mock';

export class TokenRepository {
    async getAuthData(clientId: string, code: string) {
        return authDataMock.find(
            (authData) =>
                authData.clientId === clientId &&
                authData.authorizationCode === code,
        );
    }
    async getSecret(clientId: string, userId: string) {
        return secretDataMock.find(
            (secretData) =>
                secretData.clientId === clientId &&
                secretData.userId === userId,
        )!.secret;
    }

    async saveAuthCode(
        userId: string,
        clientId: string,
        code: string,
        expiresAt: Date,
    ) {
        const authData = {
            clientId,
            userId,
            authorizationCode: code,
            codeExpiresAt: expiresAt,
        };

        authDataMock.push(authData);
        return authData;
    }

    async saveToken(
        clientId: string,
        userId: string,
        token: string,
        expiresAt: Date,
    ) {
        const authDataIndex = authDataMock.findIndex(
            (authData) =>
                authData.clientId === clientId && authData.userId === userId,
        )!;
        authDataMock[authDataIndex] = {
            ...authDataMock[authDataIndex],
            accessToken: token,
            accessTokenExpiresAt: expiresAt,
        };

        return authDataMock[authDataIndex];
    }

    async findToken(token: string) {
        return authDataMock.find((authData) => authData.accessToken === token);
    }

    async deleteToken(token: string) {
        authDataMock.filter((authData) => authData.accessToken !== token);

        return true;
    }
}
