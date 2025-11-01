import express from 'express';
const router = express.Router();

import { AuthController } from '../controllers/authController.js';

const authController = new AuthController();

// Rota de login
import { validateBody } from '../../middleware/validateBody.js';
import { loginSchema } from '../validators/auth.validator.js';

router.post('/login', validateBody(loginSchema), (req, res) => authController.login(req, res));

export default router;
