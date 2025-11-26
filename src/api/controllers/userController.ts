import { Request, Response } from 'express';
import { CreateUserDto, UpdateUserDto } from '../../types/user.types.js';
import UserService from '../../core/services/userService.js';
import { createUserSchema, updateUserSchema } from '../validators/user.validator.js';
import { formatZodError } from '../validators/zodErrorFormatter.js';

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
    
    this.getAllUsers = this.getAllUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(500).json({ message: errorMessage });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'ID do usuário é obrigatório' });
        return;
      }
      
      const user = await this.userService.getUserById(id);
      
      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado' });
        return;
      }
      
      res.status(200).json(user);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(500).json({ message: errorMessage });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      // validatedBody is populated by validateBody middleware
      const userData: CreateUserDto = (req as any).validatedBody ?? req.body;
      const user = await this.userService.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao criar usuário';
      res.status(400).json({ message: errorMessage });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'ID do usuário é obrigatório' });
        return;
      }
      // validatedBody is populated by validateBody middleware
      const userData: UpdateUserDto = (req as any).validatedBody ?? req.body;
      const user = await this.userService.updateUser(id, userData);
      res.status(200).json(user);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar usuário';
      const statusCode = error instanceof Error && error.message === 'Usuário não encontrado.' ? 404 : 400;
      res.status(statusCode).json({ message: errorMessage });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'ID do usuário é obrigatório' });
        return;
      }
      
      await this.userService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao deletar usuário';
      const statusCode = error instanceof Error && error.message === 'Usuário não encontrado.' ? 404 : 400;
      res.status(statusCode).json({ message: errorMessage });
    }
  }
}

export default UserController;