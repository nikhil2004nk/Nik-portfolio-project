import * as React from 'react';
import { UploadCloud, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  onUpload?: (file: File) => void;
  currentImage?: string | null;
  isUploading?: boolean;
}

export function ImageUploader({ label, onUpload, currentImage, isUploading = false }: ImageUploaderProps) {
  const [dragActive, setDragActive] = React.useState(false);
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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload?.(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onUpload?.(e.target.files[0]);
    }
  };

  const handleClick = () => {
    if (!isUploading) {
      inputRef.current?.click();
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-mono text-muted uppercase tracking-wider">
        {label}
      </label>
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
          dragActive ? 'border-signal bg-signal/5' : 'border-hairline bg-panel hover:bg-panel/80'
        } ${isUploading ? 'opacity-75 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input 
          type="file" 
          ref={inputRef} 
          className="hidden" 
          accept="image/png, image/jpeg, image/jpg, image/webp" 
          onChange={handleChange} 
        />
        
        {isUploading ? (
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 text-signal animate-spin mx-auto mb-4" />
            <p className="text-sm text-primary">Uploading image...</p>
          </div>
        ) : (
          <>
            <UploadCloud className="w-8 h-8 text-muted mx-auto mb-4" />
            <p className="text-sm text-primary mb-1">Drag and drop an image here</p>
            <p className="text-xs font-mono text-muted">or click to browse</p>
            
            {currentImage && (
              <div className="mt-4 p-2 bg-ink rounded border border-hairline inline-block">
                 {currentImage.startsWith('/') ? (
                   <img src={`http://localhost:4000${currentImage}`} alt="Preview" className="h-20 object-contain" />
                 ) : (
                   <img src={currentImage} alt="Preview" className="h-20 object-contain" />
                 )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
