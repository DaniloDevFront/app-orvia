import { CheckinStatus } from '@shared/enums';

export type Routine = {
  id: string;
  userId: string;
  name: string;
  weekDays: string[];
  latitude: number;
  longitude: number;
  time: string;
};

export type Checkin = {
  id: string;
  userId: string;
  routineId: string;
  date: string;
  status: CheckinStatus;
}; 