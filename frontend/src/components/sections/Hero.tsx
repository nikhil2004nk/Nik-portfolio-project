'use client';
import * as React from 'react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

export function Hero() {
  const [typedText, setTypedText] = React.useState('');
  const terminalText = `GET /nikhil\n200 OK\n{\n  "role": "Full Stack Developer",\n  "stack": ["Next.js", "NestJS", "PostgreSQL", "AI/RAG"],\n  "status": "available"\n}`;

  React.useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(terminalText.substring(0, i));
      i++;
      if (i > terminalText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-[80vh] flex items-center py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="z-10"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-signal"></span>
            </span>
            <span className="text-sm font-mono text-signal">SYSTEM.STATUS = ONLINE</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 tracking-tight">
            Nikhil
          </h1>
          <h2 className="text-xl md:text-2xl text-muted font-mono mb-6">
            Full Stack Developer (Next.js, NestJS, AI, FinTech)
          </h2>
          <p className="text-lg mb-8 max-w-lg">
            Building scalable, high-performance platforms that process data, automate workflows, and drive business value.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" variant="primary">View Projects</Button>
            <Button size="lg" variant="secondary">Hire Me</Button>
            <Button size="lg" variant="ghost">Download Resume</Button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="z-10 bg-panel border border-hairline rounded-lg p-6 shadow-xl relative font-mono text-sm"
        >
          <div className="flex items-center gap-2 mb-4 border-b border-hairline pb-4">
            <div className="w-3 h-3 rounded-full bg-alert"></div>
            <div className="w-3 h-3 rounded-full bg-ledger"></div>
            <div className="w-3 h-3 rounded-full bg-signal"></div>
          </div>
          <pre className="text-muted overflow-x-auto">
            <code className="text-primary">GET /nikhil</code>\n
            <span className="text-signal">200 OK</span>\n
            {`{\n  "role": "Full Stack Developer",\n  "stack": ["Next.js", "NestJS", "PostgreSQL", "AI/RAG"],\n  "status": "available"\n}`}
          </pre>
        </motion.div>
      </div>
      
      {/* Ambient background blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-signal/5 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse"></div>
    </section>
  );
}
