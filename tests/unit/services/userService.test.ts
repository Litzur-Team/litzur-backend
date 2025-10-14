import UserService from '../../../src/core/services/userService';
import UserRepository from '../../../src/core/repositories/userRepository';
import { CreateUserDto, UpdateUserDto, User } from '../../../src/types/user.types';

// Mock do UserRepository
jest.mock('../../../src/core/repositories/userRepository');

describe('UserService', () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    // Criar mock do repository
    mockUserRepository = new UserRepository() as jest.Mocked<UserRepository>;
    userService = new UserService(mockUserRepository);

    // Limpar mocks antes de cada teste
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return all users from repository', () => {
      const mockUsers: User[] = [
        {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      mockUserRepository.getAll.mockReturnValue(mockUsers);

      const result = userService.getAllUsers();

      expect(mockUserRepository.getAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUsers);
    });

    it('should return empty array when no users exist', () => {
      mockUserRepository.getAll.mockReturnValue([]);

      const result = userService.getAllUsers();

      expect(result).toEqual([]);
      expect(mockUserRepository.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserById', () => {
    it('should return user when found', () => {
      const mockUser: User = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockUserRepository.getById.mockReturnValue(mockUser);

      const result = userService.getUserById('1');

      expect(mockUserRepository.getById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockUser);
    });

    it('should return undefined when user not found', () => {
      mockUserRepository.getById.mockReturnValue(undefined);

      const result = userService.getUserById('999');

      expect(mockUserRepository.getById).toHaveBeenCalledWith('999');
      expect(result).toBeUndefined();
    });
  });

  describe('createUser', () => {
    const validUserData: CreateUserDto = {
      name: 'Test User',
      email: 'test@example.com'
    };

    const mockCreatedUser: User = {
      id: '1',
      ...validUserData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    it('should create user with valid data', () => {
      mockUserRepository.create.mockReturnValue(mockCreatedUser);

      const result = userService.createUser(validUserData);

      expect(mockUserRepository.create).toHaveBeenCalledWith(validUserData);
      expect(result).toEqual(mockCreatedUser);
    });

    it('should throw error when name is empty', () => {
      const invalidUserData: CreateUserDto = {
        name: '',
        email: 'test@example.com'
      };

      expect(() => {
        userService.createUser(invalidUserData);
      }).toThrow('O nome do usuário é obrigatório.');

      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });

    it('should throw error when name is only whitespace', () => {
      const invalidUserData: CreateUserDto = {
        name: '   ',
        email: 'test@example.com'
      };

      expect(() => {
        userService.createUser(invalidUserData);
      }).toThrow('O nome do usuário é obrigatório.');

      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });

    it('should throw error when name is missing', () => {
      const invalidUserData = {
        name: undefined as any,
        email: 'test@example.com'
      };

      expect(() => {
        userService.createUser(invalidUserData);
      }).toThrow('O nome do usuário é obrigatório.');

      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });

    it('should throw error when email is empty', () => {
      const invalidUserData: CreateUserDto = {
        name: 'Test User',
        email: ''
      };

      expect(() => {
        userService.createUser(invalidUserData);
      }).toThrow('O email do usuário é obrigatório.');

      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });

    it('should throw error when email is only whitespace', () => {
      const invalidUserData: CreateUserDto = {
        name: 'Test User',
        email: '   '
      };

      expect(() => {
        userService.createUser(invalidUserData);
      }).toThrow('O email do usuário é obrigatório.');

      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });

    it('should throw error when email is missing', () => {
      const invalidUserData = {
        name: 'Test User',
        email: undefined as any
      };

      expect(() => {
        userService.createUser(invalidUserData);
      }).toThrow('O email do usuário é obrigatório.');

      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('updateUser', () => {
    const existingUser: User = {
      id: '1',
      name: 'Existing User',
      email: 'existing@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updateData: UpdateUserDto = {
      name: 'Updated User'
    };

    const updatedUser: User = {
      ...existingUser,
      ...updateData,
      updatedAt: new Date()
    };

    it('should update existing user', () => {
      mockUserRepository.getById.mockReturnValue(existingUser);
      mockUserRepository.update.mockReturnValue(updatedUser);

      const result = userService.updateUser('1', updateData);

      expect(mockUserRepository.getById).toHaveBeenCalledWith('1');
      expect(mockUserRepository.update).toHaveBeenCalledWith('1', updateData);
      expect(result).toEqual(updatedUser);
    });

    it('should throw error when user does not exist', () => {
      mockUserRepository.getById.mockReturnValue(undefined);

      expect(() => {
        userService.updateUser('999', updateData);
      }).toThrow('Usuário não encontrado.');

      expect(mockUserRepository.getById).toHaveBeenCalledWith('999');
      expect(mockUserRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('deleteUser', () => {
    const existingUser: User = {
      id: '1',
      name: 'Existing User',
      email: 'existing@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    it('should delete existing user', () => {
      mockUserRepository.getById.mockReturnValue(existingUser);
      mockUserRepository.delete.mockReturnValue(true);

      const result = userService.deleteUser('1');

      expect(mockUserRepository.getById).toHaveBeenCalledWith('1');
      expect(mockUserRepository.delete).toHaveBeenCalledWith('1');
      expect(result).toBe(true);
    });

    it('should throw error when user does not exist', () => {
      mockUserRepository.getById.mockReturnValue(undefined);

      expect(() => {
        userService.deleteUser('999');
      }).toThrow('Usuário não encontrado.');

      expect(mockUserRepository.getById).toHaveBeenCalledWith('999');
      expect(mockUserRepository.delete).not.toHaveBeenCalled();
    });
  });
});