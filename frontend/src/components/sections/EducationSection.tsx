import * as React from 'react';

import { Education, Certification } from '../../types/experience';

interface EducationSectionProps {
  education: Education[];
  certs: Certification[];
}

export function EducationSection({ education = [], certs = [] }: EducationSectionProps) {
  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
          <div className="flex flex-col gap-2 mb-8 md:mb-12">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-8 bg-signal"></div>
              <span className="text-sm font-mono text-signal uppercase tracking-widest">// 06</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient">Education</h2>
          </div>
            <div className="space-y-8">
              {education.map((edu: any) => (
                <div key={edu.id}>
                  <h3 className="text-lg font-bold text-primary">{edu.degree}</h3>
                  <h4 className="text-signal font-mono text-sm">{edu.institution}</h4>
                  <div className="text-muted text-sm mt-2">{edu.year}</div>
                  <div className="text-muted text-sm mt-1">Score: {edu.cgpa}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
          <div className="flex flex-col gap-2 mb-8 md:mb-12 mt-16 md:mt-24">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-8 bg-signal"></div>
              <span className="text-sm font-mono text-signal uppercase tracking-widest">// 07</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient">Certifications</h2>
          </div>
            <div className="space-y-6">
              {certs.map((cert: any) => (
                <div key={cert.id} className="p-4 border border-hairline rounded bg-panel">
                  <h3 className="text-md font-bold text-primary mb-1">{cert.name}</h3>
                  <h4 className="text-signal font-mono text-sm mb-2">{cert.org}</h4>
                  {cert.certificateUrl && (
                    <a href={cert.certificateUrl} className="text-xs font-mono text-primary hover:text-signal transition-colors underline underline-offset-4">View Credential</a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

