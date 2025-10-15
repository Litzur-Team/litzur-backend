






import { User, CreateUserDto, UpdateUserDto } from '../../types/user.types.js';

const users: User[] = [
  { 
    id: '1', 
    name: 'Alice', 
    email: 'alice@example.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  { 
    id: '2', 
    name: 'Bob', 
    email: 'bob@example.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

let nextId = 3;

class UserRepository {
  getAll(): User[] {
    return users;
  }

  getById(id: string): User | undefined {
    return users.find(user => user.id === id);
  }

  create(userData: CreateUserDto): User {
    const newUser: User = { 
      id: (nextId++).toString(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    users.push(newUser);
    return newUser;
  }

  update(id: string, userData: UpdateUserDto): User | undefined {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }

    const updatedUser: User = {
      id: users[userIndex]!.id,
      name: userData.name ?? users[userIndex]!.name,
      email: userData.email ?? users[userIndex]!.email,
      createdAt: users[userIndex]!.createdAt,
      updatedAt: new Date()
    };
    
    users[userIndex] = updatedUser;
    return updatedUser;
  }

  delete(id: string): boolean {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return false;
    }

    users.splice(userIndex, 1);
    return true;
  }
}

export default UserRepository;