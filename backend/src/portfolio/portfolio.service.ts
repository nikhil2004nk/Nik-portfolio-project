import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PortfolioService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private prisma: PrismaService,
  ) {}

  async getPortfolio() {
    const cacheKey = 'portfolio_data';
    const cachedData = await this.cacheManager.get(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }

    // Fetch everything concurrently via Prisma
    const [
      profile,
      featuredProjects,
      skills,
      socials,
      services,
      experience,
      education,
      certifications,
      testimonials
    ] = await Promise.all([
      this.prisma.profile.findFirst(),
      this.prisma.project.findMany({ where: { published: true }, orderBy: { order: 'asc' } }),
      this.prisma.skill.findMany({ orderBy: { order: 'asc' } }),
      this.prisma.social.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }),
      this.prisma.service.findMany({ orderBy: { order: 'asc' } }),
      this.prisma.experience.findMany({ include: { achievements: true }, orderBy: { order: 'asc' } }),
      this.prisma.education.findMany({ orderBy: { order: 'asc' } }),
      this.prisma.certification.findMany({ where: { published: true }, orderBy: { order: 'asc' } }),
      this.prisma.testimonial.findMany({ where: { published: true }, orderBy: { order: 'asc' } }),
    ]);

    const data = {
      profile,
      featuredProjects,
      skills,
      socials,
      services,
      experience,
      education,
      certifications,
      testimonials,
    };

    // Cache for 60 seconds
    await this.cacheManager.set(cacheKey, data, 60000);

    return data;
  }
}
