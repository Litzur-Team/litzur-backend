import express from 'express';
const router = express.Router();

import userRoutes from './userRoutes.js';
import authRoutes from './authRoutes.js';

router.use(authRoutes);
router.use(userRoutes);

export default router;