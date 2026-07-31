export interface StorageService {
  uploadFile(file: any): Promise<{
    id: string;
    url: string;
    filename: string;
    size: number;
    mimeType: string;
  }>;
}
