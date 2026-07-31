import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SkillService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.skill.findMany({ orderBy: { order: 'asc' } });
  }

  async count() {
    return this.prisma.skill.count();
  }
}
