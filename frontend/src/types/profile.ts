import { BaseEntity } from './common';

export interface Profile extends BaseEntity {
  name: string;
  headline: string;
  bio: string | null;
  tagline: string | null;
  currentCompany: string | null;
  currentRole: string | null;
  freelanceAvailable: boolean;
  remoteAvailable: boolean;
  relocationAvailable: boolean;
  profileImage: string | null;
  coverImage: string | null;
  email: string | null;
  location: string | null;
}

export interface Social extends BaseEntity {
  platform: string;
  label: string;
  url: string;
  icon: string | null;
  visible: boolean;
  order: number;
}
