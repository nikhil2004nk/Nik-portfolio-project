import { BaseEntity } from './common';

export interface Experience extends BaseEntity {
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string | null;
  employmentType: string | null;
  achievements: string[];
}

export interface Education extends BaseEntity {
  institution: string;
  degree: string;
  field: string | null;
  startDate: string;
  endDate: string | null;
  score: string | null;
  description: string | null;
}

export interface Certification extends BaseEntity {
  name: string;
  issuer: string;
  issueDate: string;
  url: string | null;
  credentialId: string | null;
}
