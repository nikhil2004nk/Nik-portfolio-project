import { BaseEntity } from './common';

export interface Skill extends BaseEntity {
  name: string;
  icon: string | null;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  order: number;
}

export interface Technology extends BaseEntity {
  name: string;
  icon: string | null;
  category: string;
}
