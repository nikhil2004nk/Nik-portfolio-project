const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const heroPath = path.join(srcDir, 'components', 'sections', 'Hero.tsx');

const heroContent = `'use client';
import * as React from 'react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

const renderHighlightedText = (text: string) => {
  return text.split('\\n').map((line, i) => {
    let highlightedLine = line.replace(/"([^"]+)":/g, '<span class="text-muted">"$1":</span>');
    highlightedLine = highlightedLine.replace(/: "([^"]+)"/g, ': <span class="text-signal">"$1"</span>');
    highlightedLine = highlightedLine.replace(/"available"/g, '<span class="text-ledger">"available"</span>');
    highlightedLine = highlightedLine.replace(/"Next\\.js"/g, '<span class="text-signal">"Next.js"</span>');
    highlightedLine = highlightedLine.replace(/"NestJS"/g, '<span class="text-signal">"NestJS"</span>');
    highlightedLine = highlightedLine.replace(/"PostgreSQL"/g, '<span class="text-signal">"PostgreSQL"</span>');
    highlightedLine = highlightedLine.replace(/"AI\\/RAG"/g, '<span class="text-signal">"AI/RAG"</span>');
    
    if (line.startsWith('GET')) {
      highlightedLine = '<span class="text-signal">GET</span> <span class="text-primary">/nikhil</span>';
    } else if (line.startsWith('200 OK')) {
      highlightedLine = '<span class="text-ledger">200 OK</span>';
    }
    
    return <div key={i} dangerouslySetInnerHTML={{ __html: highlightedLine }} />;
  });
};

export function Hero() {
  const [typedText, setTypedText] = React.useState('');
  const terminalText = \`GET /nikhil\\n200 OK\\n{\\n  "role": "Full Stack Developer",\\n  "stack": ["Next.js", "NestJS", "PostgreSQL", "AI/RAG"],\\n  "status": "available"\\n}\`;
  const isTypingComplete = typedText.length >= terminalText.length;

  React.useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(terminalText.substring(0, i));
      i++;
      if (i > terminalText.length) clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-[80vh] flex items-center relative overflow-hidden bg-ink pt-20 border-b border-hairline">
      <div className="container mx-auto px-4 max-w-6xl relative">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-signal/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Headline and CTAs fade up AFTER terminal finishes typing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 20 }}
            transition={{ duration: 0.5, ease: 'easeOut', staggerChildren: 0.2 }}
            className="order-2 md:order-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-signal"></span>
              </span>
              <span className="font-mono text-sm tracking-widest text-signal uppercase">Available for Freelance Projects</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-primary mb-4 tracking-tight">Nikhil</h1>
            <h2 className="text-xl md:text-2xl font-mono text-muted mb-6">Full Stack Developer (Next.js, NestJS, AI, FinTech)</h2>
            <p className="text-lg text-muted max-w-lg mb-10 leading-relaxed">
              Building scalable, high-performance platforms that process data, automate workflows, and drive business value.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="primary">Hire Me</Button>
              <Button size="lg" variant="secondary">View Projects</Button>
              <Button size="lg" variant="secondary">Download Resume</Button>
            </div>
          </motion.div>

          {/* Right Column - Animated Terminal Style Panel */}
          <div className="order-1 md:order-2 bg-panel border border-hairline rounded-lg p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-signal/50 to-transparent opacity-50" />
            <div className="flex items-center gap-2 mb-4 border-b border-hairline pb-4">
              <div className="w-3 h-3 rounded-full bg-alert"></div>
              <div className="w-3 h-3 rounded-full bg-ledger"></div>
              <div className="w-3 h-3 rounded-full bg-signal"></div>
            </div>
            <pre className="font-mono text-sm text-primary whitespace-pre-wrap leading-relaxed">
              <div className="inline-block">{renderHighlightedText(typedText)}</div>
              <span className="animate-pulse bg-signal w-2 h-4 inline-block ml-1 align-middle"></span>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
`;

fs.writeFileSync(heroPath, heroContent);
console.log('Hero patched successfully!');
