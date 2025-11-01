import express from 'express';
const router = express.Router();

import UserController from '../controllers/userController.js';
import UserService from '../../core/services/userService.js';
import UserRepository from '../../core/repositories/userRepository.js';
import { authenticateJWT } from '../../middleware/authenticateJWT.js';
import { validateBody } from '../../middleware/validateBody.js';
import { createUserSchema, updateUserSchema } from '../validators/user.validator.js';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);


/**
 * @swagger
 * /api/users:
 *  post:
 *      summary: Criação de usuário
 *      tags: [Usuários]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              
 *                          name:
 *                              type: string
 *                          email:
 *                              type: string
 *      responses:
 *          201:
 *              description: Usuário criado com sucesso
 *          400:
 *              description: Erro ao criar usuario
 */

// Rota pública
router.post('/users', validateBody(createUserSchema), userController.createUser);

// Rotas protegidas com JWT
router.get('/users', authenticateJWT, userController.getAllUsers);
router.get('/users/:id', authenticateJWT, userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', validateBody(updateUserSchema), userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

export default router;