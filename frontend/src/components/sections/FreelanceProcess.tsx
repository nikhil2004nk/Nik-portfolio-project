import * as React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';

export function FreelanceProcess() {
  const steps = [
    { name: 'Discovery', desc: 'Understanding your goals and requirements.' },
    { name: 'Proposal', desc: 'Detailed scope, timeline, and architecture.' },
    { name: 'Design', desc: 'System architecture and UI/UX design.' },
    { name: 'Development', desc: 'Iterative, test-driven implementation.' },
    { name: 'Review', desc: 'Staging deployment and client feedback.' },
    { name: 'Launch', desc: 'Production deployment and handoff.' },
  ];

  return (
    <section id="process" className="py-16 md:py-24 lg:py-32 bg-ink border-t border-hairline">
      <div className="container mx-auto px-5 md:px-8 lg:px-12 max-w-7xl">
        <ScrollReveal>
          <h2 className="text-sm font-mono text-muted mb-12">// 08 — Freelance Process</h2>
        </ScrollReveal>
        
        {/* Mobile / Tablet Vertical List */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, i) => (
            <ScrollReveal key={i} className="flex gap-6">
              <span className="font-mono text-3xl font-bold text-ledger">0{i + 1}</span>
              <div>
                <h3 className="font-display text-xl font-bold text-primary mb-1">{step.name}</h3>
                <p className="text-muted">{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Desktop Horizontal Stepper */}
        <div className="hidden lg:grid grid-cols-6 gap-4 relative">
          <div className="absolute top-5 left-8 right-8 h-px bg-hairline -z-10" />
          {steps.map((step, i) => (
            <ScrollReveal key={i} className="relative pt-2">
              <div className="bg-ink inline-block pr-4 mb-4">
                <span className="font-mono text-3xl font-bold text-ledger bg-panel border border-hairline w-12 h-12 flex items-center justify-center rounded-full">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-primary mb-2">{step.name}</h3>
              <p className="text-muted text-sm leading-relaxed pr-4">{step.desc}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
