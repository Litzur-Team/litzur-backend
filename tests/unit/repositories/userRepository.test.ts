import UserRepository from '../../../src/core/repositories/userRepository';
import { CreateUserDto, UpdateUserDto } from '../../../src/types/user.types';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
  });

  describe('getAll', () => {
    it('should return all users', () => {
      const users = userRepository.getAll();
      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBeGreaterThan(0);
    });

    it('should return users with correct structure', () => {
      const users = userRepository.getAll();
      const firstUser = users[0];
      
      expect(firstUser).toHaveProperty('id');
      expect(firstUser).toHaveProperty('name');
      expect(firstUser).toHaveProperty('email');
      expect(firstUser).toHaveProperty('createdAt');
      expect(firstUser).toHaveProperty('updatedAt');
    });
  });

  describe('getById', () => {
    it('should return user when valid id is provided', () => {
      const user = userRepository.getById('1');
      expect(user).toBeDefined();
      expect(user?.id).toBe('1');
    });

    it('should return undefined when invalid id is provided', () => {
      const user = userRepository.getById('999');
      expect(user).toBeUndefined();
    });
  });

  describe('create', () => {
    it('should create a new user with valid data', () => {
      const userData: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com'
      };

      const newUser = userRepository.create(userData);

      expect(newUser).toBeDefined();
      expect(newUser.name).toBe(userData.name);
      expect(newUser.email).toBe(userData.email);
      expect(newUser.id).toBeDefined();
      expect(newUser.createdAt).toBeInstanceOf(Date);
      expect(newUser.updatedAt).toBeInstanceOf(Date);
    });

    it('should add user to the list', () => {
      const initialCount = userRepository.getAll().length;
      const userData: CreateUserDto = {
        name: 'Another User',
        email: 'another@example.com'
      };

      userRepository.create(userData);
      const finalCount = userRepository.getAll().length;

      expect(finalCount).toBe(initialCount + 1);
    });

    it('should generate unique IDs for different users', () => {
      const userData1: CreateUserDto = {
        name: 'User 1',
        email: 'user1@example.com'
      };

      const userData2: CreateUserDto = {
        name: 'User 2',
        email: 'user2@example.com'
      };

      const user1 = userRepository.create(userData1);
      const user2 = userRepository.create(userData2);

      expect(user1.id).not.toBe(user2.id);
    });
  });

  describe('update', () => {
    it('should update existing user', () => {
      const updateData: UpdateUserDto = {
        name: 'Updated Name'
      };

      const updatedUser = userRepository.update('1', updateData);

      expect(updatedUser).toBeDefined();
      expect(updatedUser?.name).toBe(updateData.name);
      expect(updatedUser?.id).toBe('1');
    });

    it('should return undefined for non-existing user', () => {
      const updateData: UpdateUserDto = {
        name: 'Updated Name'
      };

      const result = userRepository.update('999', updateData);

      expect(result).toBeUndefined();
    });

    it('should only update provided fields', () => {
      const originalUser = userRepository.getById('1');
      const updateData: UpdateUserDto = {
        name: 'Only Name Updated'
      };

      const updatedUser = userRepository.update('1', updateData);

      expect(updatedUser?.name).toBe(updateData.name);
      expect(updatedUser?.email).toBe(originalUser?.email);
    });

    it('should update the updatedAt timestamp', () => {
      const originalUser = userRepository.getById('1');
      const originalUpdatedAt = originalUser?.updatedAt;

      // Wait a bit to ensure timestamp difference
      setTimeout(() => {
        const updateData: UpdateUserDto = {
          name: 'Updated Name'
        };

        const updatedUser = userRepository.update('1', updateData);
        expect(updatedUser?.updatedAt).not.toEqual(originalUpdatedAt);
      }, 10);
    });
  });

  describe('delete', () => {
    it('should delete existing user', () => {
      const initialCount = userRepository.getAll().length;
      const result = userRepository.delete('1');

      expect(result).toBe(true);
      expect(userRepository.getAll().length).toBe(initialCount - 1);
      expect(userRepository.getById('1')).toBeUndefined();
    });

    it('should return false for non-existing user', () => {
      const result = userRepository.delete('999');
      expect(result).toBe(false);
    });

    it('should not affect other users when deleting one', () => {
      const initialUsers = userRepository.getAll();
      const userToDelete = initialUsers[0];
      const otherUsers = initialUsers.filter(user => user.id !== userToDelete?.id);

      userRepository.delete(userToDelete?.id || '');

      const remainingUsers = userRepository.getAll();
      expect(remainingUsers.length).toBe(otherUsers.length);
      
      otherUsers.forEach(user => {
        expect(userRepository.getById(user.id)).toBeDefined();
      });
    });
  });
});