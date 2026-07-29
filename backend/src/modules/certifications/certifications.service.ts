import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CertificationsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.certification.findMany({
      orderBy: { createdAt: "desc" }
    });
  }
}
