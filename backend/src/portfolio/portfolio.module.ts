import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { ProfileModule } from '../profile/profile.module';
import { ProjectModule } from '../project/project.module';
import { SkillModule } from '../skill/skill.module';

@Module({
  imports: [ProfileModule, ProjectModule, SkillModule],
  controllers: [PortfolioController],
  providers: [PortfolioService],
})
export class PortfolioModule {}
