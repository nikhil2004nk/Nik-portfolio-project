import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TechnologyRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.technology.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async count() {
    return this.prisma.technology.count();
  }
}
