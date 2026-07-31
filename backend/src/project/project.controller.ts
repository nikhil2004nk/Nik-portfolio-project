import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll(@Query('category') category?: string, @Query('technology') technology?: string) {
    return this.projectService.findPublic(category, technology);
  }

  @Get('featured')
  findFeatured() {
    return this.projectService.getFeatured();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.projectService.findBySlug(slug);
  }
}
