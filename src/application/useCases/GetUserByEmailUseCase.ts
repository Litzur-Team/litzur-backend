import UserRepository from '../../core/repositories/userRepository';
import { User } from '../../types/user.types';

export class GetUserByEmailUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(email: string): Promise<User | null> {
        const user = this.userRepository.findByEmail(email);
        if (!user) return null;
        return user;
    }
}
