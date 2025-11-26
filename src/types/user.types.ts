export interface User {
  id: string;
  name: string | null;
  email: string;
  password?: string;
  createdAt: Date;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
}