import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Prisma } from '@prisma/client';
// import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'; // Add guard later

// @UseGuards(JwtAuthGuard)
@Controller('admin/projects')
export class AdminProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: Prisma.ProjectCreateInput) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectService.findAllAdmin();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: Prisma.ProjectUpdateInput) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }

  // Nested routes for Features
  @Post(':id/features')
  addFeature(@Param('id') id: string, @Body() data: { title: string; description?: string; order?: number }) {
    return this.projectService.addFeature(id, data);
  }

  // Same for screenshots, metrics, technologies...
}
