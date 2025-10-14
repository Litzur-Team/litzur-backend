import { User, CreateUserDto, UpdateUserDto } from '../../types/user.types.js';
import UserRepository from '../repositories/userRepository.js';

class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  getAllUsers(): User[] {
    return this.userRepository.getAll();
  }

  getUserById(id: string): User | undefined {
    return this.userRepository.getById(id);
  }

  createUser(userData: CreateUserDto): User {
    if (!userData.name || userData.name.trim() === '') {
      throw new Error('O nome do usuário é obrigatório.');
    }
    if (!userData.email || userData.email.trim() === '') {
      throw new Error('O email do usuário é obrigatório.');
    }
    return this.userRepository.create(userData);
  }

  updateUser(id: string, userData: UpdateUserDto): User | undefined {
    const existingUser = this.userRepository.getById(id);
    if (!existingUser) {
      throw new Error('Usuário não encontrado.');
    }
    return this.userRepository.update(id, userData);
  }

  deleteUser(id: string): boolean {
    const existingUser = this.userRepository.getById(id);
    if (!existingUser) {
      throw new Error('Usuário não encontrado.');
    }
    return this.userRepository.delete(id);
  }
}

export default UserService;