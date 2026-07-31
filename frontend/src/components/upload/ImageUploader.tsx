import * as React from 'react';
import { UploadCloud } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  onUpload?: (file: File) => void;
  currentImage?: string | null;
}

export function ImageUploader({ label, onUpload, currentImage }: ImageUploaderProps) {
  const [dragActive, setDragActive] = React.useState(false);

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

  return (
    <div className="space-y-2">
      <label className="block text-xs font-mono text-muted uppercase tracking-wider">
        {label}
      </label>
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive ? 'border-signal bg-signal/5' : 'border-hairline bg-panel hover:bg-panel/80'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <UploadCloud className="w-8 h-8 text-muted mx-auto mb-4" />
        <p className="text-sm text-primary mb-1">Drag and drop an image here</p>
        <p className="text-xs font-mono text-muted">or click to browse</p>
        {currentImage && (
          <div className="mt-4 p-2 bg-ink rounded border border-hairline inline-block">
             <img src={currentImage} alt="Preview" className="h-20 object-contain" />
          </div>
        )}
      </div>
    </div>
  );
}
