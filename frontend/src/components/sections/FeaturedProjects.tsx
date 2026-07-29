import Link from 'next/link';
import * as React from 'react';
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
              <Link href={`/projects/${project.slug}`}><h3 className="text-xl font-display font-bold mb-2 text-primary hover:text-signal transition-colors cursor-pointer">{project.name} <span className="inline-block w-2 h-2 rounded-full bg-signal ml-2 align-middle animate-pulse"></span></h3></Link>
              <p className="text-muted mb-6 flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {(project.techStack || []).map((tech: string) => (
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
