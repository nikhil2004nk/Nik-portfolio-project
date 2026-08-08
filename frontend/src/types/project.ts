import { BaseEntity } from './common';

export interface Project extends BaseEntity {
  name: string;
  slug: string;
  description: string;
  content: string | null;
  thumbnailUrl: string | null;
  coverImageUrl: string | null;
  githubUrl: string | null;
  demoUrl: string | null;
  caseStudy: string | null;
  published: boolean;
  categories: string[];
  technologies: string[];
  metrics: ProjectMetric[];
  features: ProjectFeature[];
  screenshots: ProjectScreenshot[];
  tags: string[];
}

export interface ProjectMetric extends BaseEntity {
  label: string;
  value: string;
  order: number;
}

export interface ProjectFeature extends BaseEntity {
  title: string;
  description: string | null;
  order: number;
}

export interface ProjectScreenshot extends BaseEntity {
  title: string;
  imageUrl: string;
  alt: string | null;
  type: 'DESKTOP' | 'MOBILE';
  order: number;
}
