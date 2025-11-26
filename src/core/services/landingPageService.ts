import { LandingPage, CreateLandingPageDto, UpdateLandingPageDto } from '../../types/landingPage.types.js';
import LandingPageRepository from '../repositories/landingPageRepository.js';

class LandingPageService {
  private landingPageRepository: LandingPageRepository;

  constructor(landingPageRepository: LandingPageRepository) {
    this.landingPageRepository = landingPageRepository;
  }

  async getAllPages(): Promise<LandingPage[]> {
    return await this.landingPageRepository.getAll();
  }

  async getPageById(id: string): Promise<LandingPage | null> {
    return await this.landingPageRepository.getById(id);
  }

  async getPageBySlug(slug: string): Promise<LandingPage | null> {
    return await this.landingPageRepository.getBySlug(slug);
  }

  async getPagesByUserId(userId: string): Promise<LandingPage[]> {
    return await this.landingPageRepository.getByUserId(userId);
  }

  async createPage(pageData: CreateLandingPageDto): Promise<LandingPage> {
    if (!pageData.title || pageData.title.trim() === '') {
      throw new Error('O título da landing page é obrigatório.');
    }
    if (!pageData.slug || pageData.slug.trim() === '') {
      throw new Error('O slug da landing page é obrigatório.');
    }
    if (!pageData.userId) {
      throw new Error('O userId é obrigatório.');
    }

    // Verifica se o slug já existe
    const existingPage = await this.landingPageRepository.getBySlug(pageData.slug);
    if (existingPage) {
      throw new Error('Já existe uma landing page com esse slug.');
    }

    return await this.landingPageRepository.create(pageData);
  }

  async updatePage(id: string, pageData: UpdateLandingPageDto): Promise<LandingPage | null> {
    const existingPage = await this.landingPageRepository.getById(id);
    if (!existingPage) {
      throw new Error('Landing page não encontrada.');
    }

    // Se estiver atualizando o slug, verifica se não existe outro com o mesmo slug
    if (pageData.slug && pageData.slug !== existingPage.slug) {
      const pageWithSlug = await this.landingPageRepository.getBySlug(pageData.slug);
      if (pageWithSlug) {
        throw new Error('Já existe uma landing page com esse slug.');
      }
    }

    return await this.landingPageRepository.update(id, pageData);
  }

  async deletePage(id: string): Promise<boolean> {
    const existingPage = await this.landingPageRepository.getById(id);
    if (!existingPage) {
      throw new Error('Landing page não encontrada.');
    }
    return await this.landingPageRepository.delete(id);
  }
}

export default LandingPageService;
