import * as React from 'react';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, Code, ExternalLink } from 'lucide-react';
import Link from 'next/link';

async function getProject(slug: string) {
  try {
    const res = await fetch(`http://127.0.0.1:4000/projects/${slug}`, { next: { revalidate: 10 } });
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
              <Code className="w-4 h-4" /> View Source
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
