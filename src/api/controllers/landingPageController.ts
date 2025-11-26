import { Request, Response } from 'express';
import { CreateLandingPageDto, UpdateLandingPageDto } from '../../types/landingPage.types.js';
import LandingPageService from '../../core/services/landingPageService.js';

class LandingPageController {
  private landingPageService: LandingPageService;

  constructor(landingPageService: LandingPageService) {
    this.landingPageService = landingPageService;
    
    this.getAllPages = this.getAllPages.bind(this);
    this.getPageById = this.getPageById.bind(this);
    this.getPageBySlug = this.getPageBySlug.bind(this);
    this.getPagesByUserId = this.getPagesByUserId.bind(this);
    this.createPage = this.createPage.bind(this);
    this.updatePage = this.updatePage.bind(this);
    this.deletePage = this.deletePage.bind(this);
  }

  async getAllPages(req: Request, res: Response): Promise<void> {
    try {
      const pages = this.landingPageService.getAllPages();
      res.status(200).json(pages);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(500).json({ message: errorMessage });
    }
  }

  async getPageById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'ID da landing page é obrigatório' });
        return;
      }
      
      const page = this.landingPageService.getPageById(id);
      
      if (!page) {
        res.status(404).json({ message: 'Landing page não encontrada' });
        return;
      }
      
      res.status(200).json(page);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(500).json({ message: errorMessage });
    }
  }

  async getPageBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      if (!slug) {
        res.status(400).json({ message: 'Slug da landing page é obrigatório' });
        return;
      }
      
      const page = this.landingPageService.getPageBySlug(slug);
      
      if (!page) {
        res.status(404).json({ message: 'Landing page não encontrada' });
        return;
      }
      
      res.status(200).json(page);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(500).json({ message: errorMessage });
    }
  }

  async getPagesByUserId(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      if (!userId) {
        res.status(400).json({ message: 'UserId é obrigatório' });
        return;
      }
      
      const pages = this.landingPageService.getPagesByUserId(userId);
      res.status(200).json(pages);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(500).json({ message: errorMessage });
    }
  }

  async createPage(req: Request, res: Response): Promise<void> {
    try {
      const pageData: CreateLandingPageDto = (req as any).validatedBody ?? req.body;
      const page = this.landingPageService.createPage(pageData);
      res.status(201).json(page);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao criar landing page';
      res.status(400).json({ message: errorMessage });
    }
  }

  async updatePage(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'ID da landing page é obrigatório' });
        return;
      }
      const pageData: UpdateLandingPageDto = (req as any).validatedBody ?? req.body;
      const page = this.landingPageService.updatePage(id, pageData);
      res.status(200).json(page);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar landing page';
      const statusCode = error instanceof Error && error.message === 'Landing page não encontrada.' ? 404 : 400;
      res.status(statusCode).json({ message: errorMessage });
    }
  }

  async deletePage(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'ID da landing page é obrigatório' });
        return;
      }
      
      this.landingPageService.deletePage(id);
      res.status(204).send();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao deletar landing page';
      const statusCode = error instanceof Error && error.message === 'Landing page não encontrada.' ? 404 : 400;
      res.status(statusCode).json({ message: errorMessage });
    }
  }
}

export default LandingPageController;
