'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  alt?: string;
}

export function ImageCarousel({ images, alt = "Project image" }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  // Helper to ensure full URL for relative paths
  const getFullUrl = (url: string) => {
    return url.startsWith('/') ? `http://localhost:4000${url}` : url;
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // If only one image, render it simply without carousel controls
  if (images.length === 1) {
    return (
      <div className="w-full h-full relative group">
        <div className="absolute inset-0 bg-ink/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
        <img 
          src={getFullUrl(images[0])} 
          alt={alt}
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative group overflow-hidden">
      {/* Images container (swipeable conceptually, but here we just use crossfade for premium feel) */}
      <div className="w-full h-full relative">
        {images.map((img, index) => (
          <img
            key={index}
            src={getFullUrl(img)}
            alt={`${alt} - view ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between p-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-ink/50 backdrop-blur-md border border-hairline flex items-center justify-center text-primary hover:text-signal hover:border-signal/50 transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-ink/50 backdrop-blur-md border border-hairline flex items-center justify-center text-primary hover:text-signal hover:border-signal/50 transition-all"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex 
                ? 'w-6 h-2 bg-signal shadow-[0_0_8px_var(--shadow-glow)]' 
                : 'w-2 h-2 bg-primary/50 hover:bg-primary/80'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
