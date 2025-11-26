import express from 'express';
const router = express.Router();

import LandingPageController from '../controllers/landingPageController.js';
import LandingPageService from '../../core/services/landingPageService.js';
import LandingPageRepository from '../../core/repositories/landingPageRepository.js';
import { authenticateJWT } from '../../middleware/authenticateJWT.js';
import { validateBody } from '../../middleware/validateBody.js';
import { createLandingPageSchema, updateLandingPageSchema } from '../validators/landingPage.validator.js';

const landingPageRepository = new LandingPageRepository();
const landingPageService = new LandingPageService(landingPageRepository);
const landingPageController = new LandingPageController(landingPageService);

/**
 * @swagger
 * /api/landing-pages:
 *  get:
 *      summary: Lista todas as landing pages
 *      tags: [Landing Pages]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Lista de landing pages
 *          401:
 *              description: Não autorizado
 */
router.get('/landing-pages', authenticateJWT, landingPageController.getAllPages);

/**
 * @swagger
 * /api/landing-pages/{id}:
 *  get:
 *      summary: Busca uma landing page por ID
 *      tags: [Landing Pages]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Landing page encontrada
 *          404:
 *              description: Landing page não encontrada
 */
router.get('/landing-pages/:id', authenticateJWT, landingPageController.getPageById);

/**
 * @swagger
 * /api/landing-pages/slug/{slug}:
 *  get:
 *      summary: Busca uma landing page por slug (pública)
 *      tags: [Landing Pages]
 *      parameters:
 *          - in: path
 *            name: slug
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Landing page encontrada
 *          404:
 *              description: Landing page não encontrada
 */
router.get('/landing-pages/slug/:slug', landingPageController.getPageBySlug);

/**
 * @swagger
 * /api/landing-pages/user/{userId}:
 *  get:
 *      summary: Lista landing pages de um usuário
 *      tags: [Landing Pages]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: userId
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Lista de landing pages do usuário
 */
router.get('/landing-pages/user/:userId', authenticateJWT, landingPageController.getPagesByUserId);

/**
 * @swagger
 * /api/landing-pages:
 *  post:
 *      summary: Cria uma nova landing page
 *      tags: [Landing Pages]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                          slug:
 *                              type: string
 *                          published:
 *                              type: boolean
 *                          content:
 *                              type: object
 *                          userId:
 *                              type: string
 *      responses:
 *          201:
 *              description: Landing page criada com sucesso
 *          400:
 *              description: Erro ao criar landing page
 */
router.post('/landing-pages', authenticateJWT, validateBody(createLandingPageSchema), landingPageController.createPage);

/**
 * @swagger
 * /api/landing-pages/{id}:
 *  put:
 *      summary: Atualiza uma landing page
 *      tags: [Landing Pages]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                          slug:
 *                              type: string
 *                          published:
 *                              type: boolean
 *                          content:
 *                              type: object
 *      responses:
 *          200:
 *              description: Landing page atualizada com sucesso
 *          404:
 *              description: Landing page não encontrada
 */
router.put('/landing-pages/:id', authenticateJWT, validateBody(updateLandingPageSchema), landingPageController.updatePage);

/**
 * @swagger
 * /api/landing-pages/{id}:
 *  delete:
 *      summary: Deleta uma landing page
 *      tags: [Landing Pages]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          204:
 *              description: Landing page deletada com sucesso
 *          404:
 *              description: Landing page não encontrada
 */
router.delete('/landing-pages/:id', authenticateJWT, landingPageController.deletePage);

export default router;
