const fs = require('fs');
const path = require('path');

// --- 1. Backend Project Service ---
const projServicePath = path.join(__dirname, '..', 'backend', 'src', 'modules', 'projects', 'projects.service.ts');
let svc = fs.readFileSync(projServicePath, 'utf8');
svc = svc.replace(
  'findAll() {\n    return this.prisma.project.findMany({ orderBy: { order: \'asc\' } });\n  }',
  `findAll() {\n    return this.prisma.project.findMany({ orderBy: { order: 'asc' } });\n  }\n\n  findBySlug(slug: string) {\n    return this.prisma.project.findUnique({ where: { slug } });\n  }`
);
fs.writeFileSync(projServicePath, svc);

// --- 2. Backend Project Controller ---
const projCtrlPath = path.join(__dirname, '..', 'backend', 'src', 'modules', 'projects', 'projects.controller.ts');
let ctrl = fs.readFileSync(projCtrlPath, 'utf8');
if (!ctrl.includes('Param')) {
  ctrl = ctrl.replace(
    "import { Controller, Get } from '@nestjs/common';",
    "import { Controller, Get, Param, NotFoundException } from '@nestjs/common';"
  );
  ctrl = ctrl.replace(
    'findAll() {\n    return this.projectsService.findAll();\n  }',
    `findAll() {\n    return this.projectsService.findAll();\n  }\n\n  @Get(':slug')\n  async findOne(@Param('slug') slug: string) {\n    const project = await this.projectsService.findBySlug(slug);\n    if (!project) throw new NotFoundException('Project not found');\n    return project;\n  }`
  );
  fs.writeFileSync(projCtrlPath, ctrl);
}

// --- 3. Frontend Project Case Study Page ---
const slugPageDir = path.join(__dirname, 'src', 'app', 'projects', '[slug]');
fs.mkdirSync(slugPageDir, { recursive: true });
const slugPageCode = `import * as React from 'react';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';

async function getProject(slug: string) {
  try {
    const res = await fetch(\`http://127.0.0.1:4000/projects/\${slug}\`, { next: { revalidate: 10 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);
  if (!project) return notFound();

  return (
    <main className="min-h-screen pt-24 pb-20 bg-ink">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-muted hover:text-signal transition-colors mb-12 font-mono text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to all systems
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">{project.name}</h1>
        <p className="text-xl text-muted mb-8 leading-relaxed">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-12">
          {(project.techStack || []).map((tech: string) => (
            <Badge key={tech} variant="outline">{tech}</Badge>
          ))}
        </div>

        <div className="flex gap-4 mb-16">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-signal transition-colors font-mono text-sm">
              <Github className="w-4 h-4" /> View Source
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-signal transition-colors font-mono text-sm">
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
          )}
        </div>

        <div className="space-y-16">
          {project.problem && (
            <section>
              <h2 className="text-sm font-mono text-signal mb-4">// 01 — The Problem</h2>
              <p className="text-lg text-primary leading-relaxed">{project.problem}</p>
            </section>
          )}
          
          {project.solution && (
            <section>
              <h2 className="text-sm font-mono text-signal mb-4">// 02 — The Solution</h2>
              <p className="text-lg text-primary leading-relaxed">{project.solution}</p>
            </section>
          )}
          
          {project.features && project.features.length > 0 && (
            <section>
              <h2 className="text-sm font-mono text-signal mb-4">// 03 — Key Features</h2>
              <ul className="space-y-4">
                {project.features.map((feature: string, i: number) => (
                  <li key={i} className="flex gap-3 text-lg text-primary">
                    <span className="text-signal">▹</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
`;
fs.writeFileSync(path.join(slugPageDir, 'page.tsx'), slugPageCode);

// --- 4. Frontend Hero Component - Typing Animation ---
const heroPath = path.join(__dirname, 'src', 'components', 'sections', 'Hero.tsx');
let hero = fs.readFileSync(heroPath, 'utf8');
if (!hero.includes('typedText')) {
  hero = hero.replace(
    'export function Hero() {',
    `export function Hero() {
  const [typedText, setTypedText] = React.useState('');
  const terminalText = \`GET /nikhil\\n200 OK\\n{\\n  "role": "Full Stack Developer",\\n  "stack": ["Next.js", "NestJS", "PostgreSQL", "AI/RAG"],\\n  "status": "available"\\n}\`;

  React.useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(terminalText.substring(0, i));
      i++;
      if (i > terminalText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);
`
  );
  
  hero = hero.replace(
    '<pre className="font-mono text-sm text-muted">GET /nikhil\\n200 OK\\n{\\n  "role": "Full Stack Developer",\\n  "stack": ["Next.js", "NestJS", "PostgreSQL", "AI/RAG"],\\n  "status": "available"\\n}</pre>',
    '<pre className="font-mono text-sm text-muted">{typedText}<span className="animate-pulse bg-signal w-2 h-4 inline-block ml-1 align-middle"></span></pre>'
  );
  // Hero is now a Client Component due to hooks
  if (!hero.includes("'use client'")) {
    hero = `'use client';\n` + hero;
  }
  fs.writeFileSync(heroPath, hero);
}

// --- 5. Project Cards Link ---
const featuredProjPath = path.join(__dirname, 'src', 'components', 'sections', 'FeaturedProjects.tsx');
let featProj = fs.readFileSync(featuredProjPath, 'utf8');
if (!featProj.includes("import Link")) {
  featProj = `import Link from 'next/link';\n` + featProj;
}
featProj = featProj.replace(
  '<h3 className="text-xl font-display font-bold mb-2 text-primary">{project.name}</h3>',
  '<Link href={`/projects/${project.slug}`}><h3 className="text-xl font-display font-bold mb-2 text-primary hover:text-signal transition-colors cursor-pointer">{project.name} <span className="inline-block w-2 h-2 rounded-full bg-signal ml-2 align-middle animate-pulse"></span></h3></Link>'
);
fs.writeFileSync(featuredProjPath, featProj);

console.log('Final prompt requirements implemented!');
