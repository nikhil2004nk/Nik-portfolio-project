'use client';

import Link from 'next/link';
import * as React from 'react';
import { Card } from '../ui/Card';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { FolderGit2, ArrowRight } from 'lucide-react';

export function FeaturedProjects({ projects = [] }: { projects: any[] }) {
  const [showAll, setShowAll] = React.useState(false);
  const initialCount = 3;
  const displayedProjects = showAll ? projects : projects.slice(0, initialCount);
  const hasMore = projects.length > initialCount;

  return (
    <section id="projects" className="py-12 md:py-24 lg:py-32 bg-ink relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-ledger/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-signal/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-5 md:px-8 lg:px-12 max-w-7xl relative z-10">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary">Featured Work</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-hairline to-transparent" />
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {displayedProjects.map((project: any, index: number) => {
            const isHeroProject = index === 0;
            return (
              <ScrollReveal key={project.id} className={isHeroProject ? "md:col-span-2 lg:col-span-3" : ""}>
                <Card className={`glass-card p-5 md:p-6 flex flex-col h-full relative overflow-hidden group hover:-translate-y-2 hover:border-signal/50 hover:shadow-[0_8px_32px_rgba(0,240,255,0.15)] transition-all duration-500 ease-out ${isHeroProject ? 'lg:flex-row lg:items-center lg:gap-12 md:p-8 lg:p-10' : ''}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-signal/5 via-transparent to-ledger/5 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none" />
                  
                  <div className={`flex-1 relative z-10 ${isHeroProject ? 'lg:max-w-xl' : ''}`}>
                    <Link href={`/projects/${project.slug}`} className="inline-block group/link mb-4">
                      <h3 className={`font-display font-bold text-primary group-hover/link:text-transparent group-hover/link:bg-clip-text group-hover/link:bg-gradient-to-r group-hover/link:from-signal group-hover/link:to-ledger transition-all duration-300 flex items-center gap-3 ${isHeroProject ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-xl md:text-2xl'}`}>
                        <FolderGit2 className="w-6 h-6 text-signal group-hover/link:text-ledger transition-colors" />
                        {project.name}
                      </h3>
                    </Link>
                    <p className={`text-muted leading-relaxed mb-8 ${isHeroProject ? 'text-lg' : ''}`}>{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {(project.techStack || []).map((tech: string) => (
                        <Badge key={tech} variant="outline" className="text-xs bg-ink/50 border-hairline text-primary/80 group-hover:border-signal/30 transition-colors">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-6 font-mono text-sm pt-4 border-t border-hairline group-hover:border-signal/20 transition-colors">
                      <Link href={`/projects/${project.slug}`} className="text-signal hover:text-ledger transition-colors flex items-center gap-2 group/case">
                        View Project <ArrowRight className="w-4 h-4 transform group-hover/case:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                  
                  {isHeroProject && (
                    <div className="hidden lg:block flex-1 h-full min-h-[350px] bg-ink/50 backdrop-blur-sm rounded-xl border border-hairline relative overflow-hidden group-hover:border-signal/40 transition-colors shadow-inner">
                      {/* Placeholder for project screenshot */}
                      <div className="absolute inset-0 flex items-center justify-center text-muted font-mono text-sm opacity-50">// system_screenshot.jpg</div>
                      
                      {/* Decorative accents */}
                      <div className="absolute top-4 left-4 flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-hairline"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-hairline"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-hairline"></div>
                      </div>
                    </div>
                  )}
                </Card>
              </ScrollReveal>
            );
          })}
          {projects.length === 0 && <p className="text-muted">No projects found.</p>}
        </div>
        
        {hasMore && (
          <ScrollReveal className="mt-16 flex justify-center">
            <Button variant="secondary" onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Show Less' : `Explore All Projects (${projects.length})`}
            </Button>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}