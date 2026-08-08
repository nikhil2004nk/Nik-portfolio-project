import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

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

  async update(data: UpdateProfileDto) {
    const profile = await this.find();
    
    return this.prisma.profile.update({
      where: { id: profile.id },
      data,
    });
  }
}
