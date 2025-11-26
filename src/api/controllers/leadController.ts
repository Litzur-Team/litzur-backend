import { Request, Response } from 'express';
import { CreateLeadDto, UpdateLeadDto } from '../../types/lead.types.js';
import LeadService from '../../core/services/leadService.js';

class LeadController {
  private leadService: LeadService;

  constructor(leadService: LeadService) {
    this.leadService = leadService;
    
    this.getAllLeads = this.getAllLeads.bind(this);
    this.getLeadById = this.getLeadById.bind(this);
    this.getLeadsByPageId = this.getLeadsByPageId.bind(this);
    this.getLeadsByEmail = this.getLeadsByEmail.bind(this);
    this.createLead = this.createLead.bind(this);
    this.updateLead = this.updateLead.bind(this);
    this.deleteLead = this.deleteLead.bind(this);
  }

  async getAllLeads(req: Request, res: Response): Promise<void> {
    try {
      const leads = this.leadService.getAllLeads();
      res.status(200).json(leads);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(500).json({ message: errorMessage });
    }
  }

  async getLeadById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'ID do lead é obrigatório' });
        return;
      }
      
      const lead = this.leadService.getLeadById(id);
      
      if (!lead) {
        res.status(404).json({ message: 'Lead não encontrado' });
        return;
      }
      
      res.status(200).json(lead);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(500).json({ message: errorMessage });
    }
  }

  async getLeadsByPageId(req: Request, res: Response): Promise<void> {
    try {
      const { pageId } = req.params;
      if (!pageId) {
        res.status(400).json({ message: 'PageId é obrigatório' });
        return;
      }
      
      const leads = this.leadService.getLeadsByPageId(pageId);
      res.status(200).json(leads);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(500).json({ message: errorMessage });
    }
  }

  async getLeadsByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.query;
      if (!email || typeof email !== 'string') {
        res.status(400).json({ message: 'Email é obrigatório' });
        return;
      }
      
      const leads = this.leadService.getLeadsByEmail(email);
      res.status(200).json(leads);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(500).json({ message: errorMessage });
    }
  }

  async createLead(req: Request, res: Response): Promise<void> {
    try {
      const leadData: CreateLeadDto = (req as any).validatedBody ?? req.body;
      const lead = this.leadService.createLead(leadData);
      res.status(201).json(lead);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao criar lead';
      res.status(400).json({ message: errorMessage });
    }
  }

  async updateLead(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'ID do lead é obrigatório' });
        return;
      }
      const leadData: UpdateLeadDto = (req as any).validatedBody ?? req.body;
      const lead = this.leadService.updateLead(id, leadData);
      res.status(200).json(lead);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar lead';
      const statusCode = error instanceof Error && error.message === 'Lead não encontrado.' ? 404 : 400;
      res.status(statusCode).json({ message: errorMessage });
    }
  }

  async deleteLead(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'ID do lead é obrigatório' });
        return;
      }
      
      this.leadService.deleteLead(id);
      res.status(204).send();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao deletar lead';
      const statusCode = error instanceof Error && error.message === 'Lead não encontrado.' ? 404 : 400;
      res.status(statusCode).json({ message: errorMessage });
    }
  }
}

export default LeadController;
