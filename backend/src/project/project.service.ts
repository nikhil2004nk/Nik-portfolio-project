import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProjectRepository } from './repository/project.repository';
import { ProjectMapper } from './mapper/project.mapper';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly projectMapper: ProjectMapper,
  ) {}

  async create(data: Prisma.ProjectCreateInput) {
    // In real implementation, this would go through repository
    return data;
  }

  async findAllAdmin() {
    return this.projectRepository.findMany({ orderBy: { order: 'asc' } });
  }

  async findPublic(category?: string, technology?: string) {
    const where: Prisma.ProjectWhereInput = { published: true };
    if (category) {
      where.categories = { some: { category: { name: category } } };
    }
    if (technology) {
      where.technologies = { some: { technology: { name: technology } } };
    }
    const projects = await this.projectRepository.findMany({ 
      where, 
      orderBy: { order: 'asc' },
      include: {
        categories: { include: { category: true } },
        technologies: { include: { technology: true } },
      }
    });
    return this.projectMapper.toPublicListResponse(projects);
  }

  async getFeatured() {
    return this.projectRepository.findFeatured();
  }

  async findOne(id: string) {
    const project = await this.projectRepository.findUnique({ id });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async findBySlug(slug: string) {
    const project = await this.projectRepository.findUnique({ slug });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async update(id: string, data: Prisma.ProjectUpdateInput) {
    // Logic to update
    return { id, ...data };
  }

  async remove(id: string) {
    // Logic to remove
    return { id };
  }

  async addFeature(projectId: string, data: any) {
    return { projectId, ...data };
  }
}
