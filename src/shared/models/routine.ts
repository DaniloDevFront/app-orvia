export interface Routine {
  id: string;
  userId: string;
  name: string;
  weekDays: string[];
  time: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface RoutinesByMonth {
  month: number;
  year: number;
  weeks: {
    weekNumber: number;
    routines: Routine[];
  }[];
} 