import express from 'express';
const router = express.Router();

import userRoutes from './userRoutes.js';
import authRoutes from './authRoutes.js';
import landingPageRoutes from './landingPageRoutes.js';
import leadRoutes from './leadRoutes.js';

router.use(authRoutes);
router.use(userRoutes);
router.use(landingPageRoutes);
router.use(leadRoutes);

export default router;