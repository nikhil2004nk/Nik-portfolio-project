import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MailService } from '../../mail/mail.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async create(createContactDto: CreateContactDto) {
    await this.prisma.contactMessage.create({
      data: createContactDto,
    });
    
    this.mailService.sendContactEmail(
      createContactDto.name, 
      createContactDto.email, 
      createContactDto.phone, 
      createContactDto.message
    ).catch(e => console.error('Failed to send email:', e));

    return { statusCode: 201, message: 'Message sent successfully' };
  }

  findAll() {
    return this.prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  remove(id: string) {
    return this.prisma.contactMessage.delete({
      where: { id }
    });
  }
}
