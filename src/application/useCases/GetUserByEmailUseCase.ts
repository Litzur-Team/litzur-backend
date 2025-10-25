import UserRepository from '../../core/repositories/userRepository.js';
import { User } from '../../types/user.types.js';

export class GetUserByEmailUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(email: string): Promise<User | null> {
        const user = this.userRepository.findByEmail(email);
        if (!user) return null;
        return user;
    }
}
