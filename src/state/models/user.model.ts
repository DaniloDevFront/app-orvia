import { ROLES } from '@shared/enums';

export interface Profile {
  id: number;
  name: string;
  phone?: string;
  birthdate?: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  email: string;
  role: ROLES[];
  created_at: string;
  updated_at: string;
  profile?: Profile;
}