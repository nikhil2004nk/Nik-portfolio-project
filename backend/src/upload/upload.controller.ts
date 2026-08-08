import { Controller, Post, Param, UseInterceptors, UploadedFile, BadRequestException, Req } from '@nestjs/common';
import type { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';

@Controller('upload')
export class UploadController {
  
  @Post('projects/:slug/image')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        const slug = req.params.slug as string;
        if (!slug) return cb(new Error('Project slug is required'), '');
        
        const uploadPath = join(process.cwd(), 'uploads', 'projects', slug);
        
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
        
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
        return cb(new BadRequestException('Only image files are allowed!'), false);
      }
      cb(null, true);
    },
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    }
  }))
  uploadProjectImage(
    @Req() req: Request,
    @Param('slug') slug: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    
    // Return the full absolute public URL to access the uploaded file.
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const url = `${baseUrl}/api/v1/uploads/projects/${slug}/${file.filename}`;
    
    return {
      success: true,
      data: {
        url,
        filename: file.filename,
        size: file.size,
        mimeType: file.mimetype
      }
    };
  }
}
