'use client';

import * as React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Button } from '../ui/Button';

import { Experience } from '../../types/experience';

interface ExperienceSectionProps {
  experience: Experience[];
}

export function ExperienceSection({ experience = [] }: ExperienceSectionProps) {
  const [showAll, setShowAll] = React.useState(false);
  const initialCount = 3;
  const displayedExperience = showAll ? experience : experience.slice(0, initialCount);
  const hasMore = experience.length > initialCount;

  return (
    <section id="experience" className="py-12 md:py-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-ledger/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary">Experience</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-hairline to-transparent" />
          </div>
        </ScrollReveal>
        
        <div className="relative border-l-2 border-hairline ml-2 md:ml-3 space-y-12 md:space-y-16 pb-4">
          {displayedExperience.map((job: any, index: number) => (
            <ScrollReveal key={job.id} className="relative pl-6 md:pl-10 group">
              {/* Glowing Timeline Node */}
              <div className="absolute -left-[9px] md:-left-[9px] top-2 w-4 h-4 rounded-full bg-ink border-2 border-signal group-hover:bg-signal group-hover:shadow-[0_0_15px_rgba(0,240,255,0.8)] transition-all duration-300" />
              
              <div className="glass-card p-5 sm:p-6 md:p-8 hover:-translate-y-1 hover:border-signal/30 transition-all duration-300 group-hover:shadow-[0_8px_32px_rgba(0,240,255,0.05)]">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-primary mb-1">{job.role}</h3>
                    <h4 className="text-signal font-mono text-sm md:text-base bg-signal/10 inline-block px-3 py-1 rounded-full border border-signal/20">{job.company}</h4>
                  </div>
                  <div className="font-mono text-sm text-muted bg-panel px-4 py-1.5 rounded-full border border-hairline whitespace-nowrap">
                    {new Date(job.startDate).getFullYear()} — {job.endDate ? new Date(job.endDate).getFullYear() : 'Present'}
                  </div>
                </div>
                
                <div className="space-y-4 mt-8">
                  {(job.bullets || []).map((ach: string, i: number) => (
                    <div key={i} className="flex gap-4 text-muted leading-relaxed">
                      <span className="text-ledger font-bold mt-0.5">▹</span>
                      <span className="text-primary/70">{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
          {experience.length === 0 && <p className="text-muted pl-8">No experience found.</p>}
        </div>
        
        {hasMore && (
          <ScrollReveal className="mt-16 flex justify-center">
            <Button variant="secondary" onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Collapse History' : `View Full History (${experience.length})`}
            </Button>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}

