import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.skill.findMany();
  }

  create(data: any) {
    return this.prisma.skill.create({ data });
  }

  update(id: string, data: any) {
    return this.prisma.skill.update({
      where: { id },
      data
    });
  }

  remove(id: string) {
    return this.prisma.skill.delete({
      where: { id }
    });
  }
}
