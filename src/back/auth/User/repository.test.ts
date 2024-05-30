import { userRepository } from './repository';
import { userMock } from './mock';

describe('UserRepository', () => {
    describe('findById', () => {
        it('should return a user when a valid ID is provided', async () => {
            const user = await userRepository.findById('user1');
            expect(user).toEqual(userMock[0]);
        });

        it('should return undefined when an invalid ID is provided', async () => {
            const user = await userRepository.findById('asdasd');
            expect(user).toBeUndefined();
        });
    });

    describe('findByEmail', () => {
        it('should return a user when a valid email is provided', async () => {
            const user = await userRepository.findByEmail('3@example.com');
            expect(user).toEqual(userMock[2]);
        });

        it('should return undefined when an invalid email is provided', async () => {
            const user = await userRepository.findByEmail('dfgdfg@example.com');
            expect(user).toBeUndefined();
        });
    });
});
