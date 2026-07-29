import * as React from 'react';

export function Experience({ experience = [] }: { experience: any[] }) {
  return (
    <section id="experience" className="py-20 bg-panel border-y border-hairline">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-sm font-mono text-muted mb-12">// 05 — Professional Experience</h2>
        <div className="space-y-12">
          {experience.map((job: any) => (
            <div key={job.id} className="grid md:grid-cols-[1fr_3fr] gap-4 md:gap-8 relative">
              <div className="font-mono text-sm text-muted">
                {new Date(job.startDate).getFullYear()} — {job.endDate ? new Date(job.endDate).getFullYear() : 'Present'}
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-primary mb-1">{job.role}</h3>
                <h4 className="text-signal font-mono text-sm mb-4">{job.company}</h4>
                <div className="space-y-2">
                  {(job.bullets || []).map((ach: string, i: number) => (
                    <div key={i} className="flex gap-3 text-muted text-sm">
                      <span className="text-signal">▹</span>
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {experience.length === 0 && <p className="text-muted">No experience found.</p>}
        </div>
      </div>
    </section>
  );
}
