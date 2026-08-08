import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private prisma: PrismaService,
  ) {}

  async getStats() {
    const cacheKey = 'admin_dashboard_stats';
    const cachedStats = await this.cacheManager.get(cacheKey);

    if (cachedStats) {
      return cachedStats;
    }

    // Doing this via Promise.all across domain services in a real full implementation,
    // but here we use prisma directly for the counts to fulfill the requirement quickly.
    const [projects, skills, messages, unreadMessages, technologies] = await Promise.all([
      this.prisma.project.count(),
      this.prisma.skill.count(),
      this.prisma.contactMessage.count(),
      this.prisma.contactMessage.count({ where: { status: 'NEW' } }),
      this.prisma.technology.count(),
    ]);

    const stats = {
      projects,
      skills,
      messages,
      unreadMessages,
      technologies,
    };

    // Cache for 30 seconds as requested
    await this.cacheManager.set(cacheKey, stats, 30000);

    return stats;
  }
}
