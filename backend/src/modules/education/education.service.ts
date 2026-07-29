import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EducationService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.education.findMany({
      orderBy: { year: "desc" }
    });
  }
}
