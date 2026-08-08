import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSkillDto) {
    return this.prisma.skill.create({ data });
  }

  async findAll() {
    return this.prisma.skill.findMany({ orderBy: { order: 'asc' } });
  }

  async findOne(id: string) {
    const skill = await this.prisma.skill.findUnique({ where: { id } });
    if (!skill) throw new NotFoundException('Skill not found');
    return skill;
  }

  async update(id: string, data: UpdateSkillDto) {
    await this.findOne(id); // Ensure exists
    return this.prisma.skill.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id); // Ensure exists
    return this.prisma.skill.delete({ where: { id } });
  }

  async count() {
    return this.prisma.skill.count();
  }
}
