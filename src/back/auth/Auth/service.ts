import { ClientRepository, clientRepository } from '@/auth/Client/repository';
import { TokenService } from '@/auth/Token/service';
import { UserRepository, userRepository } from '@/auth/User/repository';
import { randomBytes } from 'crypto';
import { EncryptJWT } from 'jose';

export class AuthService {
    private readonly clientRepository: ClientRepository;
    private readonly userRepository: UserRepository;
    private readonly tokenService: TokenService;

    constructor() {
        this.clientRepository = clientRepository;
        this.userRepository = userRepository;
        this.tokenService = new TokenService();
    }

    async generateAuthorizationCode(userId: string, clientId: string) {
        const code = randomBytes(32).toString('hex');
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10);
        await this.tokenService.saveAuthorizationCode(
            userId,
            clientId,
            code,
            expiresAt,
        );
        return code;
    }

    async generateAccessToken(
        authorizationCode: string,
        clientId: string,
        clientSecret: string,
    ) {
        let userId: string;

        try {
            const isCodeValid =
                await this.tokenService.validateAuthorizationCode(
                    clientId,
                    authorizationCode,
                );
            userId = isCodeValid.userId;
        } catch (err) {
            throw err;
        }

        const isClientSecretValid = await this.clientRepository.validateSecret(
            clientId,
            clientSecret,
        );

        if (!isClientSecretValid) {
            throw new Error('Invalid client secret');
        }

        const jwt = this.tokenService.createToken(userId, clientId);
        return jwt;
    }

    validateToken(token: string) {
        return this.tokenService.isTokenValid(token);
    }
}
