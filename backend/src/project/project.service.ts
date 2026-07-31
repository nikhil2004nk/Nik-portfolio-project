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
    return this.projectRepository.create(data);
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
    // Strip read-only and relational fields that cause Prisma validation errors
    const { 
      id: _, 
      createdAt, 
      updatedAt, 
      technologies,
      features,
      screenshots,
      metrics,
      tags,
      categories,
      
      // Extract frontend-specific fields
      name,
      title,
      content,
      thumbnailUrl,
      coverImageUrl,
      githubUrl,
      demoUrl,
      
      ...updateData 
    } = data as any;
    
    // Map to Prisma fields
    const finalName = name || title;
    if (finalName !== undefined) updateData.name = finalName;
    if (thumbnailUrl !== undefined) updateData.thumbnail = thumbnailUrl;
    if (coverImageUrl !== undefined) updateData.coverImage = coverImageUrl;
    
    if (content !== undefined) {
      updateData.caseStudy = { content };
    }
    
    if (githubUrl !== undefined || demoUrl !== undefined) {
      updateData.links = {
        github: githubUrl || '',
        demo: demoUrl || ''
      };
    }
    
    return this.projectRepository.update({ id }, updateData);
  }

  async remove(id: string) {
    return this.projectRepository.delete({ id });
  }

  async addFeature(projectId: string, data: any) {
    return { projectId, ...data };
  }
}
