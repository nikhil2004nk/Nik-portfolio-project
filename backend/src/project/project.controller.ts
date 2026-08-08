import { Controller, Get, Param, Query, Post, Patch, Delete, Body } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    // If it's a UUID, look up by ID. Otherwise look up by slug.
    if (id.length === 36 && id.includes('-')) {
      return this.projectService.findOne(id);
    }
    return this.projectService.findBySlug(id);
  }

  @Post()
  create(@Body() createData: any) {
    return this.projectService.create(createData);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.projectService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
