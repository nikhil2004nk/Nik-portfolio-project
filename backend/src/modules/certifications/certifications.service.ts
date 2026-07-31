import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CertificationsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.certification.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  create(data: any) {
    return this.prisma.certification.create({ data });
  }

  update(id: string, data: any) {
    return this.prisma.certification.update({
      where: { id },
      data
    });
  }

  remove(id: string) {
    return this.prisma.certification.delete({
      where: { id }
    });
  }
}
