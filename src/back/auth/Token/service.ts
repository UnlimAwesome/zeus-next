import { EncryptJWT } from 'jose';
import { TokenRepository } from './repository';
import { userService } from '@/auth/User/service';

export class TokenService {
    private readonly tokenRepository: TokenRepository;

    constructor() {
        this.tokenRepository = new TokenRepository();
    }

    async saveAuthorizationCode(
        userId: string,
        clientId: string,
        code: string,
        expiresAt: Date,
    ) {
        return await this.tokenRepository.saveAuthCode(
            userId,
            clientId,
            code,
            expiresAt,
        );
    }

    async createToken(userId: string, clientId: string) {
        const secret = await this.tokenRepository.getSecret(clientId, userId);

        const userData = await userService.getUserById(userId);
        const payload = { userId: userData!.id, role: userData!.role };
        const encodedSecret = new TextEncoder().encode(secret);
        const jwt = await new EncryptJWT(payload)
            .setProtectedHeader({
                alg: 'dir',
                enc: 'A128CBC-HS256',
            })
            .setIssuedAt()
            .setExpirationTime('10m')
            .setIssuer('zeus')
            .encrypt(encodedSecret);

        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10);
        await this.tokenRepository.saveToken(clientId, userId, jwt, expiresAt);

        return jwt;
    }

    async validateAuthorizationCode(clientId: string, code: string) {
        const authData = await this.tokenRepository.getAuthData(clientId, code);
        if (!authData) {
            throw new Error('Invalid authorization code');
        }
        if (authData.accessToken) {
            this.tokenRepository.deleteToken(authData.accessToken);
            throw new Error('Access token already exists');
        }

        return authData;
    }

    async isTokenValid(token: string) {
        const data = await this.tokenRepository.findToken(token);
        if (!data) {
            return false;
        }
        return data.accessTokenExpiresAt! > new Date();
    }

    async revokeToken(token: string) {
        return await this.tokenRepository.deleteToken(token);
    }
}
