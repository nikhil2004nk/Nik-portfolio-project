import * as React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 bg-ink">
      <div className="container mx-auto px-5 md:px-8 lg:px-12 max-w-7xl">
        <ScrollReveal>
          <h2 className="text-sm font-mono text-muted mb-12">// 01 — About</h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-start">
          <ScrollReveal className="hidden lg:block">
            <div className="p-8 border border-hairline rounded-lg bg-panel">
              <h3 className="text-3xl font-display font-bold text-primary leading-tight mb-4">
                3+ Years <br/>
                <span className="text-muted">Fintech & AI Systems</span>
              </h3>
              <p className="font-mono text-sm text-signal uppercase tracking-widest">Based in India</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal className="text-lg text-muted leading-relaxed space-y-6">
            <p>
              I am a Full Stack Developer specializing in building scalable architectures and data-driven platforms. My focus is on creating robust backend systems using NestJS and PostgreSQL, paired with highly interactive and performant frontends built in Next.js and React.
            </p>
            <p>
              Recently, my work has centered around the FinTech space—developing secure platforms that handle complex workflows—as well as integrating AI/LLMs to build Retrieval-Augmented Generation (RAG) pipelines for smart automation.
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
