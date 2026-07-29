const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

fs.mkdirSync(path.join(srcDir, 'common', 'filters'), { recursive: true });
fs.writeFileSync(path.join(srcDir, 'common', 'filters', 'http-exception.filter.ts'), `import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    response
      .status(status)
      .json({
        statusCode: status,
        message: typeof exceptionResponse === 'string' ? exceptionResponse : (exceptionResponse as any).message || exception.message,
        error: (exceptionResponse as any).error || 'Error',
      });
  }
}
`);

fs.mkdirSync(path.join(srcDir, 'mail'), { recursive: true });
fs.writeFileSync(path.join(srcDir, 'mail', 'mail.module.ts'), `import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
`);

fs.writeFileSync(path.join(srcDir, 'mail', 'mail.service.ts'), `import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendContactEmail(name: string, email: string, phone: string | undefined, message: string) {
    if (!process.env.SMTP_HOST) return;
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_TO_EMAIL,
      subject: \`New Portfolio Contact from \${name}\`,
      text: \`Name: \${name}\\nEmail: \${email}\\nPhone: \${phone || 'N/A'}\\n\\nMessage:\\n\${message}\`,
    });
  }
}
`);

fs.mkdirSync(path.join(srcDir, 'modules', 'contact', 'dto'), { recursive: true });
fs.writeFileSync(path.join(srcDir, 'modules', 'contact', 'dto', 'create-contact.dto.ts'), `import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
`);

fs.writeFileSync(path.join(srcDir, 'modules', 'contact', 'contact.controller.ts'), `import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('contact')
@UseGuards(ThrottlerGuard)
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }
}
`);

fs.writeFileSync(path.join(srcDir, 'modules', 'contact', 'contact.service.ts'), `import { Injectable } from '@nestjs/common';
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
}
`);

fs.writeFileSync(path.join(srcDir, 'modules', 'contact', 'contact.module.ts'), `import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { MailModule } from '../../mail/mail.module';

@Module({
  imports: [MailModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
`);

console.log('Advanced endpoints scaffolded successfully.');
