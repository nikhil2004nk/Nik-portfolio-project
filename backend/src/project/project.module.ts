import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { AdminProjectController } from './admin-project.controller';
import { ProjectRepository } from './repository/project.repository';

@Module({
  controllers: [ProjectController, AdminProjectController],
  providers: [ProjectService, ProjectRepository],
  exports: [ProjectService],
})
export class ProjectModule {}
