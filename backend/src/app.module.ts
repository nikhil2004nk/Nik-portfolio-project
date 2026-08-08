import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Core Domains
import { ProfileModule } from './profile/profile.module';
import { ProjectModule } from './project/project.module';
import { SkillModule } from './skill/skill.module';
import { AuthModule } from './auth/auth.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CategoryModule } from './category/category.module';
import { CertificationModule } from './certification/certification.module';
import { ContactMessageModule } from './contact-message/contact-message.module';
import { EducationModule } from './education/education.module';
import { ExperienceModule } from './experience/experience.module';
import { ServiceModule } from './service/service.module';
import { SocialModule } from './social/social.module';
import { TagModule } from './tag/tag.module';
import { TechnologyModule } from './technology/technology.module';
import { TestimonialModule } from './testimonial/testimonial.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({ isGlobal: true }),
    ServeStaticModule.forRoot(
      {
        rootPath: join(process.cwd(), 'uploads'),
        serveRoot: '/api/v1/uploads',
      },
      {
        rootPath: join(process.cwd(), 'uploads'),
        serveRoot: '/uploads',
      }
    ),
    PrismaModule,
    AuthModule,
    ProfileModule,
    ProjectModule,
    SkillModule,
    PortfolioModule,
    DashboardModule,
    CategoryModule,
    CertificationModule,
    ContactMessageModule,
    EducationModule,
    ExperienceModule,
    ServiceModule,
    SocialModule,
    TagModule,
    TechnologyModule,
    TestimonialModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
