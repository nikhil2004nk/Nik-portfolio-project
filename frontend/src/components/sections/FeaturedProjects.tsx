'use client';

import Link from 'next/link';
import * as React from 'react';
import { Card } from '../ui/Card';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function FeaturedProjects({ projects = [] }: { projects: any[] }) {
  const [showAll, setShowAll] = React.useState(false);
  const initialCount = 3;
  const displayedProjects = showAll ? projects : projects.slice(0, initialCount);
  const hasMore = projects.length > initialCount;

  return (
    <section id="projects" className="py-16 md:py-24 lg:py-32 bg-panel border-t border-hairline">
      <div className="container mx-auto px-5 md:px-8 lg:px-12 max-w-7xl">
        <ScrollReveal>
          <h2 className="text-sm font-mono text-muted mb-12">// 03 — Featured Projects</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayedProjects.map((project: any, index: number) => {
            const isHeroProject = index === 0;
            return (
              <ScrollReveal key={project.id} className={isHeroProject ? "md:col-span-2 lg:col-span-3" : ""}>
                <Card className={`p-6 flex flex-col h-full relative overflow-hidden group hover:-translate-y-1 hover:border-signal hover:shadow-[0_8px_24px_rgba(62,217,196,0.15)] transition-all duration-200 ease-out ${isHeroProject ? 'lg:flex-row lg:items-center lg:gap-12 lg:p-12' : ''}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-signal/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-600 ease-out pointer-events-none" />
                  
                  <div className={`flex-1 ${isHeroProject ? 'lg:max-w-xl' : ''}`}>
                    <Link href={`/projects/${project.slug}`} className="inline-block group/link">
                      <h3 className={`font-display font-bold mb-3 text-primary group-hover/link:text-signal transition-colors cursor-pointer flex items-center gap-3 ${isHeroProject ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
                        <span className="inline-block w-2 h-2 rounded-full bg-signal" title="Live System"></span>
                        {project.name}
                      </h3>
                    </Link>
                    <p className={`text-muted leading-relaxed mb-8 ${isHeroProject ? 'text-lg' : ''}`}>{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {(project.techStack || []).map((tech: string) => (
                        <Badge key={tech} variant="outline" className="text-xs bg-ink/50">{tech}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-6 font-mono text-sm pt-4 border-t border-hairline">
                      <Link href={`/projects/${project.slug}`} className="text-signal hover:text-ledger transition-colors flex items-center gap-1 group/case">
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
        
        {hasMore && (
          <ScrollReveal className="mt-12 flex justify-center">
            <Button variant="outline" onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Show Less' : `View All Projects (${projects.length})`}
            </Button>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}