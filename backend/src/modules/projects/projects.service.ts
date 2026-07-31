import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.project.findMany({
      orderBy: { order: "asc" }
    });
  }

  findBySlug(slug: string) {
    return this.prisma.project.findUnique({ where: { slug } });
  }

  create(data: any) {
    if (!data.slug) {
      data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    return this.prisma.project.create({ data });
  }

  update(id: string, data: any) {
    return this.prisma.project.update({
      where: { id },
      data
    });
  }

  remove(id: string) {
    return this.prisma.project.delete({
      where: { id }
    });
  }
}
