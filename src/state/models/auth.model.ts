import { UserType } from '@shared/enums';

export type User = {
  id: string;
  name: string;
  email: string;
  type: UserType;
}; 