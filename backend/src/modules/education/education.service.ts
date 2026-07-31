import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EducationService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.education.findMany({
      orderBy: { year: 'desc' }
    });
  }

  create(data: any) {
    return this.prisma.education.create({ data });
  }

  update(id: string, data: any) {
    return this.prisma.education.update({
      where: { id },
      data
    });
  }

  remove(id: string) {
    return this.prisma.education.delete({
      where: { id }
    });
  }
}
