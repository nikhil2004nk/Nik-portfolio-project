const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// 1. Update globals.css
const globalsCssPath = path.join(srcDir, 'app', 'globals.css');
const newGlobalsCss = `@import "tailwindcss";

@theme inline {
  --font-display: var(--font-space-grotesk);
  --font-mono: var(--font-ibm-plex-mono);
  --font-body: var(--font-inter);

  --color-ink: var(--bg-ink);
  --color-panel: var(--bg-panel);
  --color-panel-raised: var(--bg-panel-raised);
  --color-hairline: var(--border-hairline);
  --color-signal: var(--accent-signal);
  --color-ledger: var(--accent-ledger);
  --color-alert: var(--accent-alert);
  --color-primary: var(--text-primary);
  --color-muted: var(--text-muted);
}

:root {
  --bg-ink: #F6F7FB;
  --bg-panel: #FFFFFF;
  --bg-panel-raised: #F0F2F8;
  --border-hairline: #DFE3ED;
  --accent-signal: #0FA99C;
  --accent-ledger: #C6870F;
  --accent-alert: #E24C4C;
  --text-primary: #101726;
  --text-muted: #5B6478;
}

.dark {
  --bg-ink: #0B1220;
  --bg-panel: #121B2E;
  --bg-panel-raised: #182240;
  --border-hairline: #232E47;
  --accent-signal: #3ED9C4;
  --accent-ledger: #F2B84B;
  --accent-alert: #FF6B6B;
  --text-primary: #EDEFF5;
  --text-muted: #8B93A8;
}

body {
  background: var(--bg-ink);
  color: var(--text-primary);
  font-family: var(--font-body), sans-serif;
}
`;
fs.writeFileSync(globalsCssPath, newGlobalsCss);

// 2. Install framer-motion (assuming it's done via run_command, we'll write the ScrollReveal component anyway)
const scrollRevealPath = path.join(srcDir, 'components', 'ui', 'ScrollReveal.tsx');
fs.writeFileSync(scrollRevealPath, `'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

export function ScrollReveal({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
`);

// 3. Update FAQ to Accordion
const faqPath = path.join(srcDir, 'components', 'sections', 'FAQ.tsx');
fs.writeFileSync(faqPath, `'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      q: 'What is your typical tech stack?',
      a: 'I primarily work with Next.js (React) for the frontend and NestJS (Node.js) for the backend, typically paired with PostgreSQL and Prisma ORM. I also frequently use Tailwind CSS for styling.'
    },
    {
      q: 'Do you take on freelance projects?',
      a: 'Yes! I am currently available for freelance opportunities. Use the contact form below to get in touch and we can discuss your project requirements.'
    },
    {
      q: 'Can you integrate AI into my application?',
      a: 'Absolutely. I have experience building RAG (Retrieval-Augmented Generation) pipelines and integrating LLMs from OpenAI into web applications to provide smart, context-aware features.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-panel border-t border-hairline">
      <ScrollReveal className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-sm font-mono text-muted mb-12">// 09 — FAQ</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-hairline pb-4 last:border-0 last:pb-0">
              <button
                className="w-full text-left flex items-center justify-between py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal rounded-md"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="text-lg font-bold text-primary flex gap-3">
                  <span className="text-signal font-mono">Q.</span>
                  {faq.q}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-muted" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="text-muted leading-relaxed flex gap-3 pt-2 pb-6">
                      <span className="text-hairline font-mono">A.</span>
                      <p>{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
`);

// 4. Update Experience to Vertical Timeline
const expPath = path.join(srcDir, 'components', 'sections', 'Experience.tsx');
fs.writeFileSync(expPath, `import * as React from 'react';
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
`);

// 5. Update Contact Inputs Focus Ring
const contactPath = path.join(srcDir, 'components', 'sections', 'Contact.tsx');
let contact = fs.readFileSync(contactPath, 'utf8');
contact = contact.replace(/focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal/g, "focus:outline-none focus:ring-2 focus:ring-signal focus:border-signal");
fs.writeFileSync(contactPath, contact);

// 6. Update Featured Projects Hover Sweep
const projectsPath = path.join(srcDir, 'components', 'sections', 'FeaturedProjects.tsx');
let proj = fs.readFileSync(projectsPath, 'utf8');
proj = proj.replace('import { Card } from \'../ui/Card\';', "import { Card } from '../ui/Card';\nimport { ScrollReveal } from '../ui/ScrollReveal';");
proj = proj.replace(/<Card key={project.id} className="p-6 flex flex-col h-full">/g, `<Card key={project.id} className="p-6 flex flex-col h-full relative overflow-hidden group hover:-translate-y-1 hover:border-signal transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-signal/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-y-full transition-all duration-1000 ease-linear pointer-events-none" />`);
proj = proj.replace(/<div className="grid grid-cols-1 md:grid-cols-2 gap-8">/, `<div className="grid grid-cols-1 md:grid-cols-2 gap-8">`);
proj = proj.replace(/\{projects\.map/g, `{projects.map((project: any) => (\n            <ScrollReveal key={project.id}>\n              ` + '<Card className="p-6 flex flex-col h-full relative overflow-hidden group hover:-translate-y-1 hover:border-signal transition-all duration-300">\n                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-signal/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-y-full transition-all duration-1000 ease-linear pointer-events-none" />');
// Actually, regular expression replacement is safer. Let's just rewrite the return statement.
const startIdx = proj.indexOf('return (');
const newReturn = `return (
    <section id="projects" className="py-20 bg-panel border-t border-hairline">
      <div className="container mx-auto px-4 max-w-5xl">
        <ScrollReveal>
          <h2 className="text-sm font-mono text-muted mb-12">// 03 — Featured Projects</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project: any) => (
            <ScrollReveal key={project.id}>
              <Card className="p-6 flex flex-col h-full relative overflow-hidden group hover:-translate-y-1 hover:border-signal hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-signal/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-y-full transition-all duration-1000 ease-linear pointer-events-none -top-full" />
                
                <Link href={\`/projects/\${project.slug}\`}>
                  <h3 className="text-2xl font-display font-bold mb-3 text-primary group-hover:text-signal transition-colors cursor-pointer flex items-center gap-3">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-signal animate-pulse" title="Live System"></span>
                    {project.name}
                  </h3>
                </Link>
                <p className="text-muted leading-relaxed mb-8 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {(project.techStack || []).map((tech: string) => (
                    <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                  ))}
                </div>
                <div className="flex gap-6 font-mono text-sm pt-4 border-t border-hairline">
                  {project.githubUrl && <a href={project.githubUrl} target="_blank" className="text-muted hover:text-signal transition-colors">GitHub</a>}
                  {project.liveUrl && <a href={project.liveUrl} target="_blank" className="text-muted hover:text-signal transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-signal"></span>Live Demo</a>}
                </div>
              </Card>
            </ScrollReveal>
          ))}
          {projects.length === 0 && <p className="text-muted">No projects found.</p>}
        </div>
      </div>
    </section>
  );
}`;
fs.writeFileSync(projectsPath, proj.substring(0, startIdx) + newReturn);

// 7. Update Button styles
const btnPath = path.join(srcDir, 'components', 'ui', 'Button.tsx');
let btn = fs.readFileSync(btnPath, 'utf8');
btn = btn.replace(
  'primary: "bg-primary text-ink hover:bg-primary/90",',
  'primary: "bg-ledger text-ink hover:bg-ledger/90",\n        secondary: "bg-transparent border border-hairline text-primary hover:bg-signal/10 hover:border-signal/50",'
);
fs.writeFileSync(btnPath, btn);

console.log('UI Overhaul script completed.');
