import express from 'express';
const router = express.Router();

import { AuthController } from '../controllers/authController';

const authController = new AuthController();

// Rota de login
router.post('/login', (req, res) => authController.login(req, res));

export default router;
