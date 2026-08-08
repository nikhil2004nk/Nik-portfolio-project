'use client';
import { motion, useScroll, useTransform } from 'framer-motion';

export function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  
  // Keep the image consistently zoomed in so we have room to pan across it
  const scale = 1.25; 
  
  // Map the scroll progress so it anchors to the left (0) when at the top,
  // and smoothly shifts to anchor to the right (1) as the user scrolls down.
  const originX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed inset-0 z-[-1] opacity-20 pointer-events-none"
      style={{ 
        backgroundImage: "url('/background.png')",
        backgroundSize: "100% auto",
        backgroundPosition: "top center",
        originY: 0,
        originX,
        scale
      }}
      aria-hidden="true"
    />
  );
}
