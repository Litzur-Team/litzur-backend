import express from 'express';
const router = express.Router();

import { AuthController } from '../controllers/authController.js';

const authController = new AuthController();

// Rota de login
router.post('/login', (req, res) => authController.login(req, res));

export default router;
