'use client';

import * as React from 'react';
import { UploadCloud, Loader2, X, GripVertical } from 'lucide-react';

interface GalleryUploaderProps {
  label: string;
  images?: string[];
  onChange: (images: string[]) => void;
  onUpload: (file: File) => Promise<string>;
}

export function GalleryUploader({ label, images = [], onChange, onUpload }: GalleryUploaderProps) {
  const [dragActive, setDragActive] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    
    try {
      const newUrls: string[] = [];
      // Upload sequentially to avoid overloading backend
      for (let i = 0; i < files.length; i++) {
        const url = await onUpload(files[i]);
        if (url) newUrls.push(url);
      }
      
      if (newUrls.length > 0) {
        onChange([...images, ...newUrls]);
      }
    } catch (error) {
      console.error('Failed to upload gallery images:', error);
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    processFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    processFiles(e.target.files);
  };

  const removeImage = (indexToRemove: number) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    onChange(updatedImages);
  };

  return (
    <div className="space-y-4">
      <label className="block text-xs font-mono text-muted uppercase tracking-wider">
        {label}
      </label>
      
      {/* Upload Dropzone */}
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
          dragActive ? 'border-signal bg-signal/5' : 'border-hairline bg-panel hover:bg-panel/80'
        } ${isUploading ? 'opacity-75 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !isUploading && inputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={inputRef} 
          className="hidden" 
          accept="image/png, image/jpeg, image/jpg, image/webp" 
          multiple
          onChange={handleChange} 
        />
        
        {isUploading ? (
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 text-signal animate-spin mx-auto mb-4" />
            <p className="text-sm text-primary">Uploading images...</p>
          </div>
        ) : (
          <>
            <UploadCloud className="w-8 h-8 text-muted mx-auto mb-4" />
            <p className="text-sm text-primary mb-1">Drag and drop images here</p>
            <p className="text-xs font-mono text-muted">or click to browse multiple files</p>
          </>
        )}
      </div>

      {/* Gallery Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
          {images.map((url, index) => {
            const displayUrl = url.startsWith('/') ? `http://localhost:4000${url}` : url;
            return (
              <div key={index} className="relative group rounded-lg overflow-hidden border border-hairline aspect-square bg-ink">
                <img 
                  src={displayUrl} 
                  alt={`Gallery item ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                
                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                  <div className="flex justify-end">
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                      className="w-7 h-7 bg-alert/20 hover:bg-alert/80 text-alert hover:text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex justify-start">
                    <span className="text-[10px] font-mono bg-ink/80 text-primary px-2 py-1 rounded backdrop-blur-sm">
                      {index + 1}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
