import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProjectRepository } from './repository/project.repository';
import { ProjectMapper } from './mapper/project.mapper';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly projectMapper: ProjectMapper,
  ) {}

  async create(data: CreateProjectDto) {
    const { technologyIds, categoryIds, tagIds, features, screenshots, metrics, ...baseData } = data;
    
    // Typecast to any to bypass strict Prisma JSON typing issues on highlights, caseStudy etc which are valid objects
    const createPayload: Prisma.ProjectCreateInput = {
      ...(baseData as any),
      technologies: technologyIds ? { create: technologyIds.map(id => ({ technology: { connect: { id } } })) } : undefined,
      categories: categoryIds ? { create: categoryIds.map(id => ({ category: { connect: { id } } })) } : undefined,
      tags: tagIds ? { create: tagIds.map(id => ({ tag: { connect: { id } } })) } : undefined,
      features: features ? { create: features } : undefined,
      screenshots: screenshots ? { create: screenshots } : undefined,
      metrics: metrics ? { create: metrics } : undefined,
    };

    return this.projectRepository.create(createPayload);
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

  async update(id: string, data: UpdateProjectDto) {
    const { technologyIds, categoryIds, tagIds, features, screenshots, metrics, ...baseData } = data;
    
    const updatePayload: Prisma.ProjectUpdateInput = { ...(baseData as any) };

    if (technologyIds) {
      updatePayload.technologies = { deleteMany: {}, create: technologyIds.map(tid => ({ technology: { connect: { id: tid } } })) };
    }
    if (categoryIds) {
      updatePayload.categories = { deleteMany: {}, create: categoryIds.map(cid => ({ category: { connect: { id: cid } } })) };
    }
    if (tagIds) {
      updatePayload.tags = { deleteMany: {}, create: tagIds.map(tid => ({ tag: { connect: { id: tid } } })) };
    }
    if (features) {
      updatePayload.features = { deleteMany: {}, create: features };
    }
    if (screenshots) {
      updatePayload.screenshots = { deleteMany: {}, create: screenshots };
    }
    if (metrics) {
      updatePayload.metrics = { deleteMany: {}, create: metrics };
    }

    return this.projectRepository.update({ id }, updatePayload);
  }

  async remove(id: string) {
    return this.projectRepository.delete({ id });
  }
}
