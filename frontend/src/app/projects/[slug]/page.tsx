import * as React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, Code, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { ProjectContentTabs } from './ProjectContentTabs';

async function getProject(slug: string) {
  try {
    const res = await fetch(`http://127.0.0.1:4000/api/v1/projects/${slug}`, { next: { revalidate: 10 } });
    if (!res.ok) return null;
    const json = await res.json();
    // Support unwrapping if backend sends `{ success: true, data: {...} }`
    return json.data !== undefined ? json.data : json;
  } catch (e) {
    console.error("Failed to fetch project:", e);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams.slug);
  
  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: project.seo?.title || `${project.name} | Nikhil Harilal Kushwaha`,
    description: project.seo?.description || project.description,
    keywords: project.seo?.keywords || '',
  };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams.slug);
  if (!project) return notFound();

  return (
    <main className="min-h-screen pt-20 pb-16 md:pt-24 md:pb-20 bg-ink">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-muted hover:text-signal transition-colors mb-12 font-mono text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to all systems
        </Link>

        {(project.gallery?.length > 0 || project.thumbnail) && (
          <div className="w-full h-64 md:h-96 mb-12 rounded-2xl overflow-hidden border border-hairline relative">
            <ImageCarousel 
              images={[...(project.gallery || []), project.thumbnail].filter(Boolean)} 
              alt={project.name} 
            />
          </div>
        )}

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary mb-6">{project.name}</h1>
        <p className="text-lg md:text-xl text-muted mb-8 leading-relaxed">{project.description}</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* LEFT COLUMN: Main Story */}
          <div className="lg:col-span-8 space-y-16">
            <ProjectContentTabs project={project} />
          </div>

          {/* RIGHT COLUMN: Specs & Metadata (Sticky) */}
          <div className="lg:col-span-4 order-first lg:order-last mb-12 lg:mb-0">
            <div className="sticky top-24 space-y-12">

              {(project.links?.github || project.links?.demo) && (
                <div>
                  <h3 className="text-sm font-mono text-signal mb-4 uppercase tracking-wider">Links</h3>
                  <div className="flex flex-col gap-3">
                    {project.links?.demo && (
                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-signal text-ink font-bold py-3 px-4 rounded-lg hover:bg-signal/90 transition-colors">
                        <ExternalLink className="w-4 h-4" /> Visit Live Demo
                      </a>
                    )}
                    {project.links?.github && (
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 border border-hairline text-primary font-medium py-3 px-4 rounded-lg hover:bg-panel transition-colors">
                        <Code className="w-4 h-4" /> View Source Code
                      </a>
                    )}
                  </div>
                </div>
              )}
              
              {(project.categories?.length > 0 || project.technologies?.length > 0 || project.tags?.length > 0) && (
                <div>
                  <h3 className="text-sm font-mono text-signal mb-4 uppercase tracking-wider">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.categories?.map((c: any) => (
                      <Badge key={`cat-${c.category.id}`} variant="default">{c.category.name}</Badge>
                    ))}
                    {project.technologies?.map((t: any) => (
                      <Badge key={`tech-${t.technology.id}`} variant="outline">{t.technology.name}</Badge>
                    ))}
                    {project.tags?.map((t: any) => (
                      <Badge key={`tag-${t.tag.id}`} variant="outline" className="opacity-70">#{t.tag.name}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {project.metrics && project.metrics.length > 0 && (
                <div>
                  <h3 className="text-sm font-mono text-signal mb-4 uppercase tracking-wider">Impact Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {project.metrics.map((metric: any, i: number) => (
                      <div key={i} className="bg-panel border border-hairline p-4 rounded-xl flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-display font-bold text-signal mb-1">{metric.value}</span>
                        <span className="text-[10px] font-mono uppercase text-muted tracking-wider">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.features && project.features.length > 0 && (
                <div>
                  <h3 className="text-sm font-mono text-signal mb-4 uppercase tracking-wider">Key Features</h3>
                  <ul className="space-y-4">
                    {project.features.map((feature: any, i: number) => (
                      <li key={i} className="flex gap-3 text-sm text-primary items-start">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-signal/10 text-signal flex items-center justify-center font-mono text-[10px] mt-0.5">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <strong className="block font-medium mb-1">{feature.title}</strong>
                          {feature.description && <span className="text-muted text-xs leading-relaxed">{feature.description}</span>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
