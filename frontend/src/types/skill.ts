import { BaseEntity } from './common';

export type SkillLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
export type SkillCategory = 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'DEVOPS' | 'CLOUD' | 'TOOL' | 'AI' | 'OTHER';

export interface Skill extends BaseEntity {
  name: string;
  level: SkillLevel;
  category: SkillCategory | null;
  icon: string | null;
  yearsOfExperience: number | null;
  order: number;
}

export interface Technology extends BaseEntity {
  name: string;
  icon: string | null;
  category: string;
}
