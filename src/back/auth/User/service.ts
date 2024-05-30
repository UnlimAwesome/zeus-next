import { UserRepository, userRepository } from './repository';

export class UserService {
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = userRepository;
    }
    async getUserById(id: string) {
        return (await this.userRepository.findById(id)) || null;
    }
    async validateUserCredentials(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            return null;
        }
        const isValid = user.password === password;
        if (!isValid) {
            return null;
        }
        return user;
    }
}

export const userService = new UserService();
