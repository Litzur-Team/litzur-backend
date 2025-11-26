import { LandingPage, CreateLandingPageDto, UpdateLandingPageDto } from '../../types/landingPage.types.js';
import { prisma } from '../../utils/prisma.js';

class LandingPageRepository {
  async getAll(): Promise<LandingPage[]> {
    return await prisma.landingPage.findMany();
  }

  async getById(id: string): Promise<LandingPage | null> {
    return await prisma.landingPage.findUnique({
      where: { id }
    });
  }

  async getBySlug(slug: string): Promise<LandingPage | null> {
    return await prisma.landingPage.findUnique({
      where: { slug }
    });
  }

  async getByUserId(userId: string): Promise<LandingPage[]> {
    return await prisma.landingPage.findMany({
      where: { userId }
    });
  }

  async create(pageData: CreateLandingPageDto): Promise<LandingPage> {
    return await prisma.landingPage.create({
      data: {
        title: pageData.title,
        slug: pageData.slug,
        published: pageData.published ?? false,
        content: pageData.content,
        userId: pageData.userId
      }
    });
  }

  async update(id: string, pageData: UpdateLandingPageDto): Promise<LandingPage | null> {
    try {
      return await prisma.landingPage.update({
        where: { id },
        data: {
          ...(pageData.title && { title: pageData.title }),
          ...(pageData.slug && { slug: pageData.slug }),
          ...(pageData.published !== undefined && { published: pageData.published }),
          ...(pageData.content && { content: pageData.content })
        }
      });
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.landingPage.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default LandingPageRepository;
