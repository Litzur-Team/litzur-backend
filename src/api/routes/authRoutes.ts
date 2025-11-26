import express from 'express';
const router = express.Router();

import { AuthController } from '../controllers/authController.js';

const authController = new AuthController();

// Rota de login
import { validateBody } from '../../middleware/validateBody.js';
import { loginSchema } from '../validators/auth.validator.js';

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Fazer login
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: joao@example.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *       401:
 *         description: Senha inválida
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/login', validateBody(loginSchema), (req, res) => authController.login(req, res));

export default router;
