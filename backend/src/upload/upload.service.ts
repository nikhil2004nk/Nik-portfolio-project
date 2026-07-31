import { Injectable } from '@nestjs/common';
import type { StorageService } from './storage.service';

@Injectable()
export class UploadService {
  constructor(private readonly storageService: StorageService) {}

  async uploadImage(file: any) {
    return this.storageService.uploadFile(file);
  }
}
