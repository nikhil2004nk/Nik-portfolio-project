import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async find() {
    let profile = await this.prisma.profile.findFirst();
    if (!profile) {
      profile = await this.prisma.profile.create({
        data: {
          name: 'Nikhil',
          headline: 'Full Stack Developer',
          email: 'contact@nikhil.com',
        },
      });
    }
    return profile;
  }

  async update(data: any) {
    const profile = await this.find();
    return this.prisma.profile.update({
      where: { id: profile.id },
      data,
    });
  }
}
