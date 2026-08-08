import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TechnologyService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.technology.findMany({
      orderBy: { name: 'asc' }
    });
  }
}
