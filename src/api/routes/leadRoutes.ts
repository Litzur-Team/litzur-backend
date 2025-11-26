import express from 'express';
const router = express.Router();

import LeadController from '../controllers/leadController.js';
import LeadService from '../../core/services/leadService.js';
import LeadRepository from '../../core/repositories/leadRepository.js';
import { authenticateJWT } from '../../middleware/authenticateJWT.js';
import { validateBody } from '../../middleware/validateBody.js';
import { createLeadSchema, updateLeadSchema } from '../validators/lead.validator.js';

const leadRepository = new LeadRepository();
const leadService = new LeadService(leadRepository);
const leadController = new LeadController(leadService);

/**
 * @swagger
 * /api/leads:
 *  get:
 *      summary: Lista todos os leads
 *      tags: [Leads]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Lista de leads
 *          401:
 *              description: Não autorizado
 */
router.get('/leads', authenticateJWT, leadController.getAllLeads);

/**
 * @swagger
 * /api/leads/{id}:
 *  get:
 *      summary: Busca um lead por ID
 *      tags: [Leads]
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
 *              description: Lead encontrado
 *          404:
 *              description: Lead não encontrado
 */
router.get('/leads/:id', authenticateJWT, leadController.getLeadById);

/**
 * @swagger
 * /api/leads/page/{pageId}:
 *  get:
 *      summary: Lista leads de uma landing page
 *      tags: [Leads]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: pageId
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Lista de leads da landing page
 */
router.get('/leads/page/:pageId', authenticateJWT, leadController.getLeadsByPageId);

/**
 * @swagger
 * /api/leads/search:
 *  get:
 *      summary: Busca leads por email
 *      tags: [Leads]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: query
 *            name: email
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Lista de leads com o email
 */
router.get('/leads/search', authenticateJWT, leadController.getLeadsByEmail);

/**
 * @swagger
 * /api/leads:
 *  post:
 *      summary: Cria um novo lead (rota pública para formulários)
 *      tags: [Leads]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          customerEmail:
 *                              type: string
 *                          customerName:
 *                              type: string
 *                          pageId:
 *                              type: string
 *      responses:
 *          201:
 *              description: Lead criado com sucesso
 *          400:
 *              description: Erro ao criar lead
 */
router.post('/leads', validateBody(createLeadSchema), leadController.createLead);

/**
 * @swagger
 * /api/leads/{id}:
 *  put:
 *      summary: Atualiza um lead
 *      tags: [Leads]
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
 *                          customerEmail:
 *                              type: string
 *                          customerName:
 *                              type: string
 *      responses:
 *          200:
 *              description: Lead atualizado com sucesso
 *          404:
 *              description: Lead não encontrado
 */
router.put('/leads/:id', authenticateJWT, validateBody(updateLeadSchema), leadController.updateLead);

/**
 * @swagger
 * /api/leads/{id}:
 *  delete:
 *      summary: Deleta um lead
 *      tags: [Leads]
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
 *              description: Lead deletado com sucesso
 *          404:
 *              description: Lead não encontrado
 */
router.delete('/leads/:id', authenticateJWT, leadController.deleteLead);

export default router;
