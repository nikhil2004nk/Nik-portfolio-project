import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.tag.findMany({
      orderBy: { name: 'asc' }
    });
  }
}
