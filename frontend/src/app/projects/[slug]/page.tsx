import * as React from 'react';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, Code, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { ImageCarousel } from '@/components/ui/ImageCarousel';

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

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams.slug);
  if (!project) return notFound();

  return (
    <main className="min-h-screen pt-20 pb-16 md:pt-24 md:pb-20 bg-ink">
      <div className="container mx-auto px-4 max-w-3xl">
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

        <div className="flex flex-wrap gap-2 mb-12">
          {(project.techStack || []).map((tech: string) => (
            <Badge key={tech} variant="outline">{tech}</Badge>
          ))}
        </div>

        <div className="flex gap-4 mb-16">
          {project.links?.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-signal transition-colors font-mono text-sm">
              <Code className="w-4 h-4" /> View Source
            </a>
          )}
          {project.links?.demo && (
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-signal transition-colors font-mono text-sm">
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
          )}
        </div>

        <div className="space-y-16">
          {project.caseStudy?.content && (
            <section>
              <h2 className="text-sm font-mono text-signal mb-4">// 01 — Case Study</h2>
              <div className="text-base md:text-lg text-primary leading-relaxed prose prose-invert prose-headings:text-signal prose-h1:text-2xl prose-h2:text-xl prose-a:text-signal max-w-none">
                <ReactMarkdown>
                  {project.caseStudy.content}
                </ReactMarkdown>
              </div>
            </section>
          )}

          {project.features && project.features.length > 0 && (
            <section>
              <h2 className="text-sm font-mono text-signal mb-4">// 02 — Key Features</h2>
              <ul className="space-y-4">
                {project.features.map((feature: any, i: number) => (
                  <li key={i} className="flex gap-3 text-base md:text-lg text-primary">
                    <span className="text-signal">▹</span>
                    <div>
                      <strong className="block font-medium">{feature.title}</strong>
                      {feature.description && <span className="text-muted text-sm">{feature.description}</span>}
                    </div>
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
