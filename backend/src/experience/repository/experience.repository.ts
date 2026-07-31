import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ExperienceRepository {
  constructor(private prisma: PrismaService) {}

  async findAllPublic() {
    return this.prisma.experience.findMany({
      include: {
        achievements: true,
      },
      orderBy: { order: 'asc' },
    });
  }

  // Admin methods
  async findAll() {
    return this.prisma.experience.findMany({
      include: { achievements: true },
      orderBy: { order: 'asc' },
    });
  }
}
