import { userMock } from './mock';

export class UserRepository {
    async findById(id: string) {
        return userMock.find((user) => user.id === id);
    }
    async findByEmail(email: string) {
        return userMock.find((user) => user.email === email);
    }
}

export const userRepository = new UserRepository();
