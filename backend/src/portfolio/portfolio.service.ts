import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { ProfileService } from '../profile/profile.service';
import { ProjectService } from '../project/project.service';
import { SkillService } from '../skill/skill.service';

@Injectable()
export class PortfolioService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private profileService: ProfileService,
    private projectService: ProjectService,
    private skillService: SkillService,
    // Inject others...
  ) {}

  async getPortfolio() {
    const cacheKey = 'portfolio_data';
    const cachedData = await this.cacheManager.get(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }

    const [profile, featuredProjects, skills] = await Promise.all([
      this.profileService.find(),
      this.projectService.getFeatured(),
      this.skillService.findAll(),
    ]);

    const data = {
      profile,
      featuredProjects,
      skills,
    };

    // Cache for 60 seconds
    await this.cacheManager.set(cacheKey, data, 60000);

    return data;
  }
}
