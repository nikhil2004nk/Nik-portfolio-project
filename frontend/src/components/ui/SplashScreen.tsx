'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SplashScreen() {
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    // Lock body scroll while splash is active
    document.body.style.overflow = 'hidden';
    
    // Hide splash screen after 2.5 seconds
    const timer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = '';
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030814]"
        >
          {/* Background Image Layer */}
          <div 
            className="absolute inset-0 z-0 opacity-50"
            style={{ 
              backgroundImage: "url('/background.png')",
              backgroundSize: "100% auto",
              backgroundPosition: "top",
              backgroundRepeat: "no-repeat"
            }}
          />
          
          {/* Dark Overlay to ensure perfect contrast without white wash */}
          <div className="absolute inset-0 bg-[#030814]/75 z-0" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* 1. Main Text */}
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-gradient tracking-tighter mb-4"
            >
              Nikhil Kushwaha
            </motion.h1>
            
            {/* 2. Subtitle */}
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
              className="font-mono text-xs md:text-sm tracking-[0.3em] text-[#94A3B8] uppercase mb-6"
            >
              Full-Stack Developer
            </motion.h2>

            {/* 3. One-Liner */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
              className="font-light text-sm md:text-base tracking-widest text-[#CBD5E1] mb-12"
            >
              Building. Learning. Shipping.
            </motion.p>
            
            {/* 4. Subtle Loading Line */}
            <motion.div 
              initial={{ opacity: 0, width: "0px" }}
              animate={{ opacity: 0.5, width: "150px" }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 1.5 }}
              className="h-[1px] bg-gradient-to-r from-transparent via-signal to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
