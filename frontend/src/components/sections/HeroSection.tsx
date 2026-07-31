'use client';
import * as React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const renderHighlightedText = (text: string) => {
  let highlighted = text;
  
  highlighted = highlighted.replace(/"([^"]+)":/g, '<span class="text-muted">"$1":</span>');
  highlighted = highlighted.replace(/: "([^"]+)"/g, ': <span class="text-signal">"$1"</span>');
  highlighted = highlighted.replace(/"available"/g, '<span class="text-ledger">"available"</span>');
  highlighted = highlighted.replace(/"React\.js"/g, '<span class="text-signal">"React.js"</span>');
  highlighted = highlighted.replace(/"Next\.js"/g, '<span class="text-signal">"Next.js"</span>');
  highlighted = highlighted.replace(/"NestJS"/g, '<span class="text-signal">"NestJS"</span>');
  highlighted = highlighted.replace(/"MySQL"/g, '<span class="text-signal">"MySQL"</span>');
  
  highlighted = highlighted.replace(/GET \/nikhil/g, '<span class="text-signal">GET</span> <span class="text-primary">/nikhil</span>');
  highlighted = highlighted.replace(/200 OK/g, '<span class="text-ledger">200 OK</span>');
  
  return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
};

import { Profile, Social } from '../../types/profile';

interface HeroSectionProps {
  profile: Profile | null;
  socials: Social[];
}

export function HeroSection({ profile, socials }: HeroSectionProps) {
  const [typedText, setTypedText] = React.useState('');
  const terminalText = `GET /nikhil\n200 OK\n{\n  "role": "Full Stack Developer",\n  "stack": ["React.js", "Next.js", "NestJS", "MySQL"],\n  "status": "available"\n}`;
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
    <section className="min-h-screen flex items-center relative overflow-hidden bg-ink pt-16 md:pt-24 border-b border-hairline">
      {/* Background Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-signal/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/4 translate-y-1/4 w-[400px] h-[400px] bg-ledger/20 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:24px_24px] pointer-events-none opacity-20" />
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left Column - Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.2 }}
            className="order-2 md:order-1"
          >
            {(profile?.freelanceAvailable || profile?.remoteAvailable) && (
              <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 glass-panel rounded-full border border-hairline">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-signal"></span>
                </span>
                <span className="font-mono text-xs tracking-widest text-primary uppercase">
                  Available for {profile.freelanceAvailable && profile.remoteAvailable ? 'Freelance & Remote' : profile.freelanceAvailable ? 'Freelance' : 'Remote'}
                </span>
              </div>
            )}
            
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-bold text-primary mb-4 tracking-tighter">
              <span className="text-gradient">{profile?.name || 'Nikhil Kushwaha'}</span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-mono text-muted mb-8 font-light">{profile?.headline || 'Full Stack Developer'}</h2>
            <p className="text-base md:text-lg text-muted max-w-lg mb-10 leading-relaxed font-light">
              {profile?.bio || 'Crafting premium, highly-performant web applications using modern architectures.'}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="#contact">
                <Button size="lg" variant="primary" className="gap-2">
                  <Mail className="w-4 h-4" /> Hire Me
                </Button>
              </Link>
              <Link href="#projects">
                <Button size="lg" variant="secondary">View Projects</Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Glass Terminal */}
          <div className="order-1 md:order-2 animate-float">
            <div className="glass-card p-1">
              <div className="bg-ink/80 rounded-[0.9rem] p-6 h-full relative overflow-hidden backdrop-blur-xl">
                {/* Terminal Header */}
                <div className="flex items-center justify-between mb-6 border-b border-hairline pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-alert/80 shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
                    <div className="w-3 h-3 rounded-full bg-ledger/80 shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
                    <div className="w-3 h-3 rounded-full bg-signal/80 shadow-[0_0_10px_rgba(0,240,255,0.5)]"></div>
                  </div>
                  <div className="font-mono text-xs text-muted">terminal ~ zsh</div>
                </div>
                
                {/* Terminal Content */}
                <pre className="font-mono text-sm text-primary whitespace-pre-wrap leading-loose">
                  {renderHighlightedText(typedText)}
                  <span className="bg-signal w-1 h-4 inline-block ml-1 align-middle animate-[blink_530ms_step-end_infinite] shadow-[0_0_8px_rgba(0,240,255,0.8)]"></span>
                </pre>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

