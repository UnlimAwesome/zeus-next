import { userMock } from './mock';
import { userService } from './service';

describe('UserService', () => {
    describe('getUserById', () => {
        it('should return a user when a valid ID is provided', async () => {
            const user = await userService.getUserById('user1');
            expect(user).toEqual(userMock[0]);
        });

        it('should return null when an invalid ID is provided', async () => {
            const user = await userService.getUserById('fgsd;hjk');
            expect(user).toBeNull();
        });
    });

    describe('validateUserCredentials', () => {
        it('should return a user when valid credentials are provided', async () => {
            const user = await userService.validateUserCredentials(
                'L6TJt@example.com',
                'password',
            );
            expect(user).toEqual(userMock[0]);
        });

        it('should return null when an invalid email is provided', async () => {
            const user = await userService.validateUserCredentials(
                'gfdfdg@example.com',
                'password2',
            );
            expect(user).toBeNull();
        });

        it('should return null when an invalid password is provided', async () => {
            const user = await userService.validateUserCredentials(
                'user2@example.com',
                'wrongPassword',
            );
            expect(user).toBeNull();
        });
    });
});
