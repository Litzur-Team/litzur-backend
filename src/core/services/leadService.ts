import { Lead, CreateLeadDto, UpdateLeadDto } from '../../types/lead.types.js';
import LeadRepository from '../repositories/leadRepository.js';

class LeadService {
  private leadRepository: LeadRepository;

  constructor(leadRepository: LeadRepository) {
    this.leadRepository = leadRepository;
  }

  async getAllLeads(): Promise<Lead[]> {
    return await this.leadRepository.getAll();
  }

  async getLeadById(id: string): Promise<Lead | null> {
    return await this.leadRepository.getById(id);
  }

  async getLeadsByPageId(pageId: string): Promise<Lead[]> {
    return await this.leadRepository.getByPageId(pageId);
  }

  async getLeadsByEmail(email: string): Promise<Lead[]> {
    return await this.leadRepository.getByEmail(email);
  }

  async createLead(leadData: CreateLeadDto): Promise<Lead> {
    if (!leadData.customerEmail || leadData.customerEmail.trim() === '') {
      throw new Error('O email do cliente é obrigatório.');
    }
    if (!leadData.pageId) {
      throw new Error('O pageId é obrigatório.');
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(leadData.customerEmail)) {
      throw new Error('Email inválido.');
    }

    return await this.leadRepository.create(leadData);
  }

  async updateLead(id: string, leadData: UpdateLeadDto): Promise<Lead | null> {
    const existingLead = await this.leadRepository.getById(id);
    if (!existingLead) {
      throw new Error('Lead não encontrado.');
    }

    // Validação de email se fornecido
    if (leadData.customerEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(leadData.customerEmail)) {
        throw new Error('Email inválido.');
      }
    }

    return await this.leadRepository.update(id, leadData);
  }

  async deleteLead(id: string): Promise<boolean> {
    const existingLead = await this.leadRepository.getById(id);
    if (!existingLead) {
      throw new Error('Lead não encontrado.');
    }
    return await this.leadRepository.delete(id);
  }
}

export default LeadService;
