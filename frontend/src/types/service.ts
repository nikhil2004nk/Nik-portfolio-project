import { BaseEntity } from './common';

export interface Service extends BaseEntity {
  title: string;
  description: string;
  icon: string | null;
  featured: boolean;
  published: boolean;
  order: number;
}
