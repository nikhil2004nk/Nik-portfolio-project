import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageService {
  async uploadFile(file: any): Promise<{
    id: string;
    url: string;
    filename: string;
    size: number;
    mimeType: string;
  }> {
    // Mock implementation for now
    return {
      id: 'mock-id',
      url: 'https://mock-url.com/mock-file.png',
      filename: 'mock-file.png',
      size: 1024,
      mimeType: 'image/png',
    };
  }
}
