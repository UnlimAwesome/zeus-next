/**
 * @jest-environment node
 */
import { authDataMock } from './mock';
import { TokenService } from './service';

describe('TokenService', () => {
    let tokenService: TokenService;

    beforeEach(() => {
        authDataMock.length = 0;
        tokenService = new TokenService();
    });

    describe('saveAuthorizationCode', () => {
        it('should save authorization code and return it', async () => {
            const expiresAt = new Date();
            const authData = await tokenService.saveAuthorizationCode(
                'user2',
                'client2',
                'code2',
                expiresAt,
            );
            expect(authData).toEqual({
                clientId: 'client2',
                userId: 'user2',
                authorizationCode: 'code2',
                codeExpiresAt: expiresAt,
            });
        });
    });

    describe('createToken', () => {
        it('should create and return accessToken', async () => {
            authDataMock.push({
                clientId: 'client1',
                userId: 'user1',
                authorizationCode: 'code1',
                codeExpiresAt: new Date(),
            });
            const result = await tokenService.createToken('user1', 'client1');

            expect(typeof result).toBe('string');
            expect(authDataMock[0].accessToken).toEqual(result);
            expect(authDataMock[0].accessTokenExpiresAt).toBeDefined();
        });
    });

    describe('validateAuthorizationCode', () => {
        it('should throw error when authorization code is invalid', async () => {
            await expect(
                tokenService.validateAuthorizationCode(
                    'client1',
                    'invalidCode',
                ),
            ).rejects.toThrow('Invalid authorization code');
        });

        it('should throw error when access token already exists', async () => {
            authDataMock.push({
                clientId: 'client1',
                userId: 'user1',
                accessToken: 'existingToken',
                accessTokenExpiresAt: new Date(),
                authorizationCode: 'code1',
                codeExpiresAt: new Date(),
            });

            await expect(
                tokenService.validateAuthorizationCode('client1', 'code1'),
            ).rejects.toThrow('Access token already exists');
        });

        it('should return authData when authorization code is valid', async () => {
            const mock = {
                clientId: 'client1',
                userId: 'user1',
                authorizationCode: 'code1',
                codeExpiresAt: new Date(),
            };
            authDataMock.push(mock);

            const result = await tokenService.validateAuthorizationCode(
                'client1',
                'code1',
            );
            expect(result).toEqual(mock);
        });
    });

    describe('isTokenValid', () => {
        it('should return false if there is no token', async () => {
            const result = await tokenService.isTokenValid('invalidToken');
            expect(result).toBe(false);
        });

        it('should return false if token is expired', async () => {
            authDataMock.push({
                clientId: 'client1',
                userId: 'user1',
                accessToken: 'expiredToken',
                accessTokenExpiresAt: new Date(Date.now() - 1000),
                authorizationCode: 'code1',
                codeExpiresAt: new Date(),
            });
            const result = await tokenService.isTokenValid('expiredToken');
            expect(result).toBe(false);
        });

        it('should return true when token is valid', async () => {
            authDataMock.push({
                clientId: 'client1',
                userId: 'user1',
                accessToken: 'validToken',
                accessTokenExpiresAt: new Date(Date.now() + 10000),
                authorizationCode: 'code1',
                codeExpiresAt: new Date(),
            });

            const result = await tokenService.isTokenValid('validToken');
            expect(result).toBe(true);
        });
    });

    describe('revokeToken', () => {
        it('should delete authData with accessToken and return true', async () => {
            authDataMock.push({
                clientId: 'client1',
                userId: 'user1',
                accessToken: 'token1',
                accessTokenExpiresAt: new Date(),
                authorizationCode: 'code1',
                codeExpiresAt: new Date(),
            });

            const result = await tokenService.revokeToken('token1');
            expect(result).toBe(true);
            expect(authDataMock).not.toContain({ accessToken: 'token1' });
        });
    });
});
