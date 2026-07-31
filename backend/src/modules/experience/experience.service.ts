import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ExperienceService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.experience.findMany({
      orderBy: { startDate: 'desc' }
    });
  }

  create(data: any) {
    return this.prisma.experience.create({ data });
  }

  update(id: string, data: any) {
    return this.prisma.experience.update({
      where: { id },
      data
    });
  }

  remove(id: string) {
    return this.prisma.experience.delete({
      where: { id }
    });
  }
}
