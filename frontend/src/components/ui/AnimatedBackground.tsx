'use client';
import { motion, useScroll, useTransform } from 'framer-motion';

export function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  
  // Maps the scroll progress (0 at the top, 1 at the bottom) 
  // to a scale value (1 to 1.25 for a 25% zoom effect)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <motion.div
      className="fixed inset-0 z-[-1] opacity-20 pointer-events-none"
      style={{ 
        backgroundImage: "url('/background.png')",
        backgroundSize: "100% auto",
        backgroundPosition: "top center",
        originY: 0,
        scale
      }}
      aria-hidden="true"
    />
  );
}
