import Link from 'next/link';
import * as React from 'react';
import { Card } from '../ui/Card';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Badge } from '../ui/Badge';

export function FeaturedProjects({ projects = [] }: { projects: any[] }) {
  return (
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
                
                <Link href={`/projects/${project.slug}`}>
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
}