import { User, CreateUserDto, UpdateUserDto } from '../../types/user.types.js';
import { prisma } from '../../utils/prisma.js';

class UserRepository {
  async getAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async getById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id }
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email }
    });
  }

  async create(userData: CreateUserDto & { password: string }): Promise<User> {
    return await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password
      }
    });
  }

  async update(id: string, userData: UpdateUserDto): Promise<User | null> {
    try {
      return await prisma.user.update({
        where: { id },
        data: {
          ...(userData.name && { name: userData.name }),
          ...(userData.email && { email: userData.email })
        }
      });
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.user.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default UserRepository;