const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// 1. About.tsx
const aboutPath = path.join(srcDir, 'components', 'sections', 'About.tsx');
fs.writeFileSync(aboutPath, `import * as React from 'react';
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
`);

// 2. FeaturedProjects.tsx
const projPath = path.join(srcDir, 'components', 'sections', 'FeaturedProjects.tsx');
let proj = fs.readFileSync(projPath, 'utf8');
const projNewReturn = `return (
    <section id="projects" className="py-16 md:py-24 lg:py-32 bg-panel border-t border-hairline">
      <div className="container mx-auto px-5 md:px-8 lg:px-12 max-w-7xl">
        <ScrollReveal>
          <h2 className="text-sm font-mono text-muted mb-12">// 03 — Featured Projects</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project: any, index: number) => {
            const isHeroProject = index === 0;
            return (
              <ScrollReveal key={project.id} className={isHeroProject ? "md:col-span-2 lg:col-span-3" : ""}>
                <Card className={\`p-6 flex flex-col h-full relative overflow-hidden group hover:-translate-y-1 hover:border-signal hover:shadow-[0_8px_24px_rgba(62,217,196,0.15)] transition-all duration-200 ease-out \${isHeroProject ? 'lg:flex-row lg:items-center lg:gap-12 lg:p-12' : ''}\`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-signal/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-600 ease-out pointer-events-none" />
                  
                  <div className={\`flex-1 \${isHeroProject ? 'lg:max-w-xl' : ''}\`}>
                    <Link href={\`/projects/\${project.slug}\`} className="inline-block group/link">
                      <h3 className={\`font-display font-bold mb-3 text-primary group-hover/link:text-signal transition-colors cursor-pointer flex items-center gap-3 \${isHeroProject ? 'text-3xl md:text-4xl' : 'text-2xl'}\`}>
                        <span className="inline-block w-2 h-2 rounded-full bg-signal" title="Live System"></span>
                        {project.name}
                      </h3>
                    </Link>
                    <p className={\`text-muted leading-relaxed mb-8 \${isHeroProject ? 'text-lg' : ''}\`}>{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {(project.techStack || []).map((tech: string) => (
                        <Badge key={tech} variant="outline" className="text-xs bg-ink/50">{tech}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-6 font-mono text-sm pt-4 border-t border-hairline">
                      <Link href={\`/projects/\${project.slug}\`} className="text-signal hover:text-ledger transition-colors flex items-center gap-1 group/case">
                        View Case Study <span className="transform group-hover/case:translate-x-1 transition-transform duration-150">→</span>
                      </Link>
                    </div>
                  </div>
                  
                  {isHeroProject && (
                    <div className="hidden lg:block flex-1 h-full min-h-[300px] bg-ink rounded-lg border border-hairline relative overflow-hidden group-hover:border-signal/30 transition-colors">
                      {/* Placeholder for project screenshot */}
                      <div className="absolute inset-0 flex items-center justify-center text-muted font-mono text-sm">// system_screenshot.jpg</div>
                    </div>
                  )}
                </Card>
              </ScrollReveal>
            );
          })}
          {projects.length === 0 && <p className="text-muted">No projects found.</p>}
        </div>
      </div>
    </section>
  );
}`;
const projStartIdx = proj.indexOf('return (');
fs.writeFileSync(projPath, proj.substring(0, projStartIdx) + projNewReturn);

// 3. FreelanceProcess.tsx
const processPath = path.join(srcDir, 'components', 'sections', 'FreelanceProcess.tsx');
fs.writeFileSync(processPath, `import * as React from 'react';
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
`);

// 4. Contact.tsx
const contactPath = path.join(srcDir, 'components', 'sections', 'Contact.tsx');
let contact = fs.readFileSync(contactPath, 'utf8');
const contactNewReturn = `return (
    <section id="contact" className="py-16 md:py-24 lg:py-32 bg-ink border-t border-hairline">
      <div className="container mx-auto px-5 md:px-8 lg:px-12 max-w-7xl">
        <ScrollReveal>
          <h2 className="text-sm font-mono text-muted mb-12">// 10 — Contact</h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <ScrollReveal>
            <form onSubmit={handleSubmit} className="space-y-6 bg-panel p-8 rounded-lg border border-hairline">
              {status === 'success' ? (
                <div className="p-8 text-center animate-in fade-in duration-300">
                  <div className="w-16 h-16 bg-signal/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-signal text-2xl">✓</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-primary mb-2">Message Sent</h3>
                  <p className="text-muted">I'll get back to you within 24-48 hours.</p>
                </div>
              ) : (
                <>
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-muted mb-2 uppercase">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-ink border border-hairline rounded-md px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-signal focus:border-signal transition-all duration-150"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-muted mb-2 uppercase">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-ink border border-hairline rounded-md px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-signal focus:border-signal transition-all duration-150"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-mono text-muted mb-2 uppercase">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-ink border border-hairline rounded-md px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-signal focus:border-signal transition-all duration-150 resize-y"
                    ></textarea>
                  </div>
                  {status === 'error' && (
                    <p className="text-alert text-sm font-mono animate-in fade-in slide-in-from-top-1">Failed to send message. Please try again.</p>
                  )}
                  <Button type="submit" variant="primary" className="w-full h-12 flex items-center justify-center" disabled={status === 'loading'}>
                    {status === 'loading' ? (
                      <span className="animate-spin w-5 h-5 border-2 border-ink border-t-transparent rounded-full" />
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </>
              )}
            </form>
          </ScrollReveal>

          <ScrollReveal className="space-y-12">
            <div>
              <h3 className="text-3xl font-display font-bold text-primary mb-6">Let's build something.</h3>
              <p className="text-lg text-muted leading-relaxed mb-8">
                I am currently available for freelance opportunities. Whether you need a robust backend API, an AI integration, or a complete full-stack platform—reach out.
              </p>
              
              <div className="flex items-center gap-3 bg-panel p-4 rounded-md border border-hairline inline-flex">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-signal"></span>
                </span>
                <span className="font-mono text-sm tracking-widest text-signal uppercase">Available for Freelance</span>
              </div>
            </div>

            <div className="space-y-4 font-mono text-sm">
              <a href="mailto:contact@example.com" className="flex items-center gap-4 text-primary hover:text-signal transition-colors p-4 bg-panel border border-hairline rounded-md">
                <span className="text-muted w-24 uppercase">Email</span> contact@example.com
              </a>
              <a href="https://github.com/nikhil2004nk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-primary hover:text-signal transition-colors p-4 bg-panel border border-hairline rounded-md">
                <span className="text-muted w-24 uppercase">GitHub</span> nikhil2004nk
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-primary hover:text-signal transition-colors p-4 bg-panel border border-hairline rounded-md">
                <span className="text-muted w-24 uppercase">LinkedIn</span> Connect
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}`;
const contactStartIdx = contact.indexOf('return (');
fs.writeFileSync(contactPath, contact.substring(0, contactStartIdx) + contactNewReturn);

// 5. Hero.tsx Easing and padding adjustments
const heroPath = path.join(srcDir, 'components', 'sections', 'Hero.tsx');
let hero = fs.readFileSync(heroPath, 'utf8');
hero = hero.replace("transition={{ duration: 0.5, ease: 'easeOut', staggerChildren: 0.2 }}", "transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.2 }}");
hero = hero.replace('<span className="animate-pulse bg-signal w-2 h-4 inline-block ml-1 align-middle"></span>', '<span className="bg-signal w-2 h-4 inline-block ml-1 align-middle animate-[blink_530ms_step-end_infinite]"></span>');
hero = hero.replace('class="text-signal"', 'className="text-signal"').replace('class="text-muted"', 'className="text-muted"').replace('class="text-ledger"', 'className="text-ledger"'); // Fix bad className from previous regex
// Inject blink keyframes into globals.css
const globalsPath = path.join(srcDir, 'app', 'globals.css');
let globals = fs.readFileSync(globalsPath, 'utf8');
if (!globals.includes('@keyframes blink')) {
  globals += '\n@keyframes blink {\n  0%, 100% { opacity: 1; }\n  50% { opacity: 0; }\n}\n';
  fs.writeFileSync(globalsPath, globals);
}
fs.writeFileSync(heroPath, hero);

console.log('Layout Refactor 2 completed.');
