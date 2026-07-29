const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'components', 'sections');

fs.writeFileSync(path.join(srcDir, 'FeaturedProjects.tsx'), `import * as React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export function FeaturedProjects({ projects = [] }: { projects: any[] }) {
  return (
    <section id="projects" className="py-20 bg-panel">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-sm font-mono text-muted mb-12">// 03 — Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project: any) => (
            <Card key={project.id} className="p-6 flex flex-col h-full">
              <h3 className="text-xl font-display font-bold mb-2 text-primary">{project.title}</h3>
              <p className="text-muted mb-6 flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {(project.technologies || []).map((tech: string) => (
                  <Badge key={tech} variant="signal">{tech}</Badge>
                ))}
              </div>
              <div className="flex gap-4 font-mono text-sm">
                {project.githubUrl && <a href={project.githubUrl} className="text-primary hover:text-signal transition-colors">GitHub</a>}
                {project.liveUrl && <a href={project.liveUrl} className="text-primary hover:text-signal transition-colors">Live Demo</a>}
              </div>
            </Card>
          ))}
          {projects.length === 0 && <p className="text-muted">No projects found.</p>}
        </div>
      </div>
    </section>
  );
}
`);

fs.writeFileSync(path.join(srcDir, 'Skills.tsx'), `import * as React from 'react';
import { Badge } from '../ui/Badge';

export function Skills({ skills = [] }: { skills: any[] }) {
  const groupedSkills = skills.reduce((acc: any, skill: any) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill.name);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-sm font-mono text-muted mb-12">// 04 — Core Competencies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(groupedSkills).map(([category, items]: [string, any]) => (
            <div key={category}>
              <h3 className="text-lg font-mono text-primary mb-4 border-b border-hairline pb-2">{category.replace(/_/g, ' ')}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item: string) => (
                  <Badge key={item} variant="outline">{item}</Badge>
                ))}
              </div>
            </div>
          ))}
          {skills.length === 0 && <p className="text-muted">No skills found.</p>}
        </div>
      </div>
    </section>
  );
}
`);

fs.writeFileSync(path.join(srcDir, 'Experience.tsx'), `import * as React from 'react';

export function Experience({ experience = [] }: { experience: any[] }) {
  return (
    <section id="experience" className="py-20 bg-panel border-y border-hairline">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-sm font-mono text-muted mb-12">// 05 — Professional Experience</h2>
        <div className="space-y-12">
          {experience.map((job: any) => (
            <div key={job.id} className="grid md:grid-cols-[1fr_3fr] gap-4 md:gap-8 relative">
              <div className="font-mono text-sm text-muted">
                {new Date(job.startDate).getFullYear()} — {job.isCurrent ? 'Present' : new Date(job.endDate).getFullYear()}
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-primary mb-1">{job.role}</h3>
                <h4 className="text-signal font-mono text-sm mb-4">{job.company}</h4>
                <p className="text-muted mb-4">{job.description}</p>
                <div className="space-y-2">
                  {(job.achievements || []).map((ach: string, i: number) => (
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
`);

fs.writeFileSync(path.join(srcDir, 'Education.tsx'), `import * as React from 'react';

export function Education({ education = [], certs = [] }: { education: any[], certs: any[] }) {
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
                  <div className="text-muted text-sm mt-1">Score: {edu.score}</div>
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
                  <h4 className="text-signal font-mono text-sm mb-2">{cert.issuer}</h4>
                  <div className="text-muted text-sm font-mono mb-3">{new Date(cert.dateObtained).getFullYear()}</div>
                  {cert.credentialUrl && (
                    <a href={cert.credentialUrl} className="text-xs font-mono text-primary hover:text-signal transition-colors underline underline-offset-4">View Credential</a>
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
`);

const pagePath = path.join(__dirname, 'src', 'app', 'page.tsx');
const pageContent = `import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Services } from "../components/sections/Services";
import { FeaturedProjects } from "../components/sections/FeaturedProjects";
import { Skills } from "../components/sections/Skills";
import { Experience } from "../components/sections/Experience";
import { Education } from "../components/sections/Education";
import { FreelanceProcess } from "../components/sections/FreelanceProcess";
import { FAQ } from "../components/sections/FAQ";
import { Contact } from "../components/sections/Contact";

export const dynamic = 'force-dynamic';

async function getData() {
  try {
    const API_BASE = 'http://127.0.0.1:4000';
    
    const [projectsRes, skillsRes, expRes, eduRes, certRes] = await Promise.all([
      fetch(\`\${API_BASE}/projects\`, { next: { revalidate: 10 } }).catch(() => null),
      fetch(\`\${API_BASE}/skills\`, { next: { revalidate: 10 } }).catch(() => null),
      fetch(\`\${API_BASE}/experience\`, { next: { revalidate: 10 } }).catch(() => null),
      fetch(\`\${API_BASE}/education\`, { next: { revalidate: 10 } }).catch(() => null),
      fetch(\`\${API_BASE}/certifications\`, { next: { revalidate: 10 } }).catch(() => null),
    ]);

    return {
      projects: projectsRes?.ok ? await projectsRes.json() : [],
      skills: skillsRes?.ok ? await skillsRes.json() : [],
      experience: expRes?.ok ? await expRes.json() : [],
      education: eduRes?.ok ? await eduRes.json() : [],
      certifications: certRes?.ok ? await certRes.json() : [],
    };
  } catch (e) {
    console.error('Failed to fetch data:', e);
    return { projects: [], skills: [], experience: [], education: [], certifications: [] };
  }
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <Hero />
      <About />
      <Services />
      <FeaturedProjects projects={data.projects} />
      <Skills skills={data.skills} />
      <Experience experience={data.experience} />
      <Education education={data.education} certs={data.certifications} />
      <FreelanceProcess />
      <FAQ />
      <Contact />
    </>
  );
}
`;
fs.writeFileSync(pagePath, pageContent);

console.log('Sections wired and page updated.');
