import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';

@Injectable()
export class ProjectMapper {
  toPublicResponse(project: any) {
    if (!project) return null;
    return {
      id: project.id,
      slug: project.slug,
      name: project.name,
      description: project.description,
      thumbnailUrl: project.thumbnail || null,
      coverImageUrl: project.coverImage || null,
      githubUrl: project.links?.github || null,
      demoUrl: project.links?.demo || null,
      content: project.caseStudy?.content || null,
      published: project.published,
      categories: project.categories?.map((c: any) => c.category.name) || [],
      technologies: project.technologies?.map((t: any) => t.technology.name) || [],
      metrics: project.metrics || [],
      features: project.features || [],
      screenshots: project.screenshots || [],
      tags: project.tags?.map((t: any) => t.tag.name) || [],
    };
  }

  toPublicListResponse(projects: any[]) {
    return projects.map(p => this.toPublicResponse(p));
  }
}
