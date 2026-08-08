import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const admin = await this.prisma.admin.findUnique({
      where: { email: loginDto.email },
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, admin.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login
    await this.prisma.admin.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() },
    });

    const payload = { sub: admin.id, email: admin.email, role: admin.role };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      }
    };
  }

  async createAdmin(loginDto: LoginDto) {
    const existingAdmin = await this.prisma.admin.findUnique({
      where: { email: loginDto.email },
    });

    if (existingAdmin) {
      throw new UnauthorizedException('Admin already exists');
    }

    const hashedPassword = await bcrypt.hash(loginDto.password, 10);

    const admin = await this.prisma.admin.create({
      data: {
        email: loginDto.email,
        password: hashedPassword,
        name: 'Admin',
      },
    });

    return {
      message: 'Admin created successfully',
      admin: {
        id: admin.id,
        email: admin.email,
      }
    };
  }

  async validateUser(userId: string) {
    const admin = await this.prisma.admin.findUnique({
      where: { id: userId },
    });
    if (!admin) {
      throw new UnauthorizedException();
    }
    return admin;
  }
}
