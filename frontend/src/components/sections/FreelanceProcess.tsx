import * as React from 'react';

export function FreelanceProcess() {
  const steps = [
    { num: '01', title: 'Discovery', desc: 'Understanding your business goals, target audience, and technical requirements.' },
    { num: '02', title: 'Architecture', desc: 'Designing the database schema, API structure, and choosing the right tech stack.' },
    { num: '03', title: 'Development', desc: 'Writing clean, testable code with regular progress updates and continuous integration.' },
    { num: '04', title: 'Deployment', desc: 'Setting up CI/CD pipelines, cloud hosting, and monitoring for a smooth launch.' },
  ];

  return (
    <section id="process" className="py-20 border-t border-hairline">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-sm font-mono text-muted mb-12">// 08 — Freelance Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-4xl font-display font-bold text-hairline mb-4">{step.num}</div>
              <h3 className="text-lg font-bold text-primary mb-2">{step.title}</h3>
              <p className="text-sm text-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
