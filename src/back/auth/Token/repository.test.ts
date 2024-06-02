import { authDataMock } from './mock';
import { TokenRepository } from './repository';

describe('TokenRepository', () => {
    let tokenRepository: TokenRepository;

    beforeAll(() => {
        tokenRepository = new TokenRepository();
    });

    describe('getAuthData', () => {
        it('should return authData when clientId and authorizationCode are valid', async () => {
            const authData = await tokenRepository.getAuthData(
                'client1',
                'code1',
            );
            expect(authData).toEqual(authDataMock[0]);
        });

        it('should return undefined when clientId or authorizationCode is invalid', async () => {
            const authData = await tokenRepository.getAuthData(
                'client22',
                'code22',
            );
            expect(authData).toBeUndefined();
        });
    });

    // describe('getSecret', () => {
    //     it('should return secret when clientId and userId are valid', async () => {
    //         const secret = await tokenRepository.getSecret('client1', 'user1');
    //         expect(typeof secret).toBe('string');
    //     });
    // });

    describe('saveAuthCode', () => {
        it('should save authData and return it', async () => {
            const expiresAt = new Date();
            const authData = await tokenRepository.saveAuthCode(
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

    describe('saveToken', () => {
        it('should save accessToken and accessTokenExpiresAt in authData and return it', async () => {
            const expiresAt = new Date();
            const updatedAuthData = await tokenRepository.saveToken(
                'client1',
                'user1',
                'newToken',
                expiresAt,
            );
            expect(updatedAuthData.accessToken).toBe('newToken');
            expect(updatedAuthData.accessTokenExpiresAt).toBe(expiresAt);
        });
    });

    describe('findToken', () => {
        it('should return authData when accessToken is valid', async () => {
            const mock = {
                clientId: 'client3',
                userId: 'user3',
                accessToken: 'token1',
                accessTokenExpiresAt: new Date(),
                authorizationCode: 'code3',
                codeExpiresAt: new Date(),
            };
            authDataMock.push(mock);
            const authData = await tokenRepository.findToken('token1');
            expect(authData).toEqual(mock);
        });

        it('should return undefined when accessToken is invalid', async () => {
            const authData = await tokenRepository.findToken('invalidToken');
            expect(authData).toBeUndefined();
        });
    });

    describe('deleteToken', () => {
        it('should delete authData with accessToken and return true', async () => {
            const result = await tokenRepository.deleteToken('token1');
            expect(result).toBe(true);
            expect(
                authDataMock.find(
                    (authData) => authData.accessToken === 'token33',
                ),
            ).toBeUndefined();
        });
    });
});
