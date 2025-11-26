import { Lead, CreateLeadDto, UpdateLeadDto } from '../../types/lead.types.js';
import { prisma } from '../../utils/prisma.js';

class LeadRepository {
  async getAll(): Promise<Lead[]> {
    return await prisma.lead.findMany();
  }

  async getById(id: string): Promise<Lead | null> {
    return await prisma.lead.findUnique({
      where: { id }
    });
  }

  async getByPageId(pageId: string): Promise<Lead[]> {
    return await prisma.lead.findMany({
      where: { pageId }
    });
  }

  async getByEmail(email: string): Promise<Lead[]> {
    return await prisma.lead.findMany({
      where: { customerEmail: email }
    });
  }

  async create(leadData: CreateLeadDto): Promise<Lead> {
    return await prisma.lead.create({
      data: {
        customerEmail: leadData.customerEmail,
        customerName: leadData.customerName ?? null,
        pageId: leadData.pageId
      }
    });
  }

  async update(id: string, leadData: UpdateLeadDto): Promise<Lead | null> {
    try {
      return await prisma.lead.update({
        where: { id },
        data: {
          ...(leadData.customerEmail && { customerEmail: leadData.customerEmail }),
          ...(leadData.customerName !== undefined && { customerName: leadData.customerName })
        }
      });
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.lead.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default LeadRepository;
