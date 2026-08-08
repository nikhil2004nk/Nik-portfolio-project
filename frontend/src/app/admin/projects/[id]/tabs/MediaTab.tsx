import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ImageUploader } from '../../../../../components/upload/ImageUploader';
import { GalleryUploader } from '../../../../../components/upload/GalleryUploader';

interface MediaTabProps {
  thumbnail: string;
  gallery: any[];
  uploadingImage: 'thumbnail' | 'cover' | null;
  handleImageUpload: (field: any) => (file: File) => Promise<void>;
  handleGalleryUpload: (file: File) => Promise<string>;
}

export function MediaTab({
  thumbnail,
  gallery,
  uploadingImage,
  handleImageUpload,
  handleGalleryUpload,
}: MediaTabProps) {
  const { setValue } = useFormContext();

  return (
    <div className="space-y-8">
      <ImageUploader
        label="Thumbnail Image"
        onUpload={handleImageUpload('thumbnailUrl')}
        currentImage={thumbnail}
        isUploading={uploadingImage === 'thumbnail'}
      />
      <GalleryUploader
        label="Project Gallery"
        images={gallery}
        onChange={(imgs: string[]) => setValue('gallery', imgs, { shouldDirty: true })}
        onUpload={handleGalleryUpload}
      />
    </div>
  );
}
