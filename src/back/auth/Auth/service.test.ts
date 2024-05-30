import { clientRepository } from '../Client/repository';
import { AuthService } from './service';
import { TokenService } from '../Token/service';

jest.mock('../Client/repository.ts', () => ({
    clientRepository: {
        validateSecret: jest.fn(),
    },
}));

jest.mock('../Token/service', () => ({
    TokenService: jest.fn().mockImplementation(() => ({
        saveAuthorizationCode: jest.fn(),
        validateAuthorizationCode: jest.fn(),
        createToken: jest.fn(),
        isTokenValid: jest.fn(),
    })),
}));

describe('AuthService', () => {
    let authService: AuthService;
    let tokenService: jest.Mocked<TokenService>;

    beforeEach(() => {
        authService = new AuthService();
        tokenService = authService['tokenService'] as jest.Mocked<TokenService>;
    });

    describe('generateAuthorizationCode', () => {
        it('should generate an authorization code and save it', async () => {
            const userId = 'user1';
            const clientId = 'client1';

            const code = await authService.generateAuthorizationCode(
                userId,
                clientId,
            );

            expect(code).toHaveLength(64); // Hex string of 32 bytes has length 64
            expect(tokenService.saveAuthorizationCode).toHaveBeenCalledWith(
                userId,
                clientId,
                code,
                expect.any(Date),
            );
        });
    });

    describe('generateAccessToken', () => {
        it('should generate an access token when provided valid authorization code and client secret', async () => {
            const authorizationCode = 'valid_code';
            const clientId = 'client1';
            const clientSecret = 'client_secret';
            const userId = 'user1';
            const token = 'jwt_token';

            tokenService.validateAuthorizationCode.mockResolvedValue({
                userId,
                clientId,
                authorizationCode,
                codeExpiresAt: new Date(),
            });
            (clientRepository.validateSecret as jest.Mock).mockResolvedValue(
                true,
            );
            tokenService.createToken.mockResolvedValue(token);

            const jwt = await authService.generateAccessToken(
                authorizationCode,
                clientId,
                clientSecret,
            );

            expect(tokenService.validateAuthorizationCode).toHaveBeenCalledWith(
                clientId,
                authorizationCode,
            );
            expect(clientRepository.validateSecret).toHaveBeenCalledWith(
                clientId,
                clientSecret,
            );
            expect(tokenService.createToken).toHaveBeenCalledWith(
                userId,
                clientId,
            );
            expect(jwt).toBe(token);
        });

        it('should throw an error when provided invalid client secret', async () => {
            const authorizationCode = 'valid_code';
            const clientId = 'client1';
            const clientSecret = 'invalid_secret';

            tokenService.validateAuthorizationCode.mockResolvedValue({
                userId: 'user1',
                clientId,
                authorizationCode,
                codeExpiresAt: new Date(),
            });
            (clientRepository.validateSecret as jest.Mock).mockResolvedValue(
                false,
            );

            await expect(
                authService.generateAccessToken(
                    authorizationCode,
                    clientId,
                    clientSecret,
                ),
            ).rejects.toThrow('Invalid client secret');
        });
    });

    describe('validateToken', () => {
        it('should return true for a valid token', async () => {
            const token = 'valid_token';

            tokenService.isTokenValid.mockResolvedValue(true);

            const isValid = await authService.validateToken(token);

            expect(isValid).toBe(true);
            expect(tokenService.isTokenValid).toHaveBeenCalledWith(token);
        });

        it('should return false for an invalid token', async () => {
            const token = 'invalid_token';

            tokenService.isTokenValid.mockResolvedValue(false);

            const isValid = await authService.validateToken(token);

            expect(isValid).toBe(false);
            expect(tokenService.isTokenValid).toHaveBeenCalledWith(token);
        });
    });
});
