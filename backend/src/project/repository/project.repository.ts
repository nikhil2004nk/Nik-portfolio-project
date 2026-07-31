import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Project } from '@prisma/client';

@Injectable()
export class ProjectRepository {
  constructor(private prisma: PrismaService) {}

  async findFeatured() {
    return this.prisma.project.findMany({
      where: { featured: true, published: true },
      include: {
        technologies: { include: { technology: true } },
        metrics: true,
      },
      orderBy: { order: 'asc' },
    });
  }

  async findMany(params: { skip?: number; take?: number; where?: Prisma.ProjectWhereInput; orderBy?: Prisma.ProjectOrderByWithRelationInput; include?: Prisma.ProjectInclude }) {
    const { skip, take, where, orderBy, include } = params;
    return this.prisma.project.findMany({ skip, take, where, orderBy, include });
  }

  async count(where?: Prisma.ProjectWhereInput) {
    return this.prisma.project.count({ where });
  }

  async findUnique(where: Prisma.ProjectWhereUniqueInput) {
    return this.prisma.project.findUnique({
      where,
      include: {
        technologies: { include: { technology: true } },
        features: true,
        screenshots: true,
        metrics: true,
        tags: { include: { tag: true } },
        categories: { include: { category: true } },
      },
    });
  }
}
