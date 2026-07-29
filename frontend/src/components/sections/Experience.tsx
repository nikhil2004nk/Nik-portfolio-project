import * as React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';

export function Experience({ experience = [] }: { experience: any[] }) {
  return (
    <section id="experience" className="py-20 bg-panel border-y border-hairline">
      <div className="container mx-auto px-4 max-w-3xl">
        <ScrollReveal>
          <h2 className="text-sm font-mono text-muted mb-12">// 05 — Professional Experience</h2>
        </ScrollReveal>
        
        <div className="relative border-l border-hairline ml-3 space-y-12 pb-4">
          {experience.map((job: any, index: number) => (
            <ScrollReveal key={job.id} className="relative pl-8">
              {/* Timeline Node */}
              <div className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-signal ring-4 ring-panel" />
              
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                <h3 className="text-2xl font-display font-bold text-primary">{job.role}</h3>
                <span className="text-signal font-mono text-sm hidden md:inline">—</span>
                <h4 className="text-signal font-mono text-base">{job.company}</h4>
              </div>
              
              <div className="font-mono text-xs tracking-widest text-muted uppercase mb-6">
                {new Date(job.startDate).getFullYear()} — {job.endDate ? new Date(job.endDate).getFullYear() : 'Present'}
              </div>
              
              <div className="space-y-3">
                {(job.bullets || []).map((ach: string, i: number) => (
                  <div key={i} className="flex gap-3 text-muted leading-relaxed">
                    <span className="text-hairline font-mono mt-1">▹</span>
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          ))}
          {experience.length === 0 && <p className="text-muted pl-8">No experience found.</p>}
        </div>
      </div>
    </section>
  );
}
