import * as React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';

export function About() {
  return (
    <section id="about" className="py-12 md:py-24 lg:py-32 bg-ink">
      <div className="container mx-auto px-5 md:px-8 lg:px-12 max-w-7xl">
        <ScrollReveal>
          <h2 className="text-sm font-mono text-muted mb-12">// 01 — About</h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-24 items-start">
          <ScrollReveal className="hidden lg:block">
            <div className="p-8 border border-hairline rounded-lg bg-panel">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-primary leading-tight mb-4">
                1 Year <br/>
                <span className="text-muted">Fintech & Web Applications</span>
              </h3>
              <p className="font-mono text-sm text-signal uppercase tracking-widest">Based in Mumbai, Maharashtra</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal className="text-lg text-muted leading-relaxed space-y-6">
            <p>
              I am a Full Stack Developer with 1 year of experience building fintech and web applications using NestJS, React.js, Next.js, TypeScript, and MySQL. I specialize in developing secure KYC/KYB onboarding systems, payment workflows, and scalable backend services.
            </p>
            <p>
              My focus is on delivering production-ready applications, implementing secure authentication systems, and collaborating across the full software development lifecycle. I have proven ability in creating responsive and optimized frontend interfaces and high-performance backend architectures.
            </p>
            <p className="text-primary font-medium">
              I believe in writing clean, maintainable code that directly solves business problems without unnecessary abstraction.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
