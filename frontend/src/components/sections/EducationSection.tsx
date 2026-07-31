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
            <h2 className="text-sm font-mono text-muted mb-8">// 06 — Education</h2>
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
            <h2 className="text-sm font-mono text-muted mb-8">// 07 — Certifications</h2>
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

