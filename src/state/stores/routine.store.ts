import { create } from 'zustand';
import { Routine, Checkin } from '@state/models';
import { mockRoutines, mockCheckins } from '@state/data/mockData';

interface RoutineState {
  routines: Routine[];
  checkins: Checkin[];
  addRoutine: (routine: Omit<Routine, 'id'>) => Promise<void>;
  getRoutines: () => Promise<void>;
  addCheckin: (checkin: Omit<Checkin, 'id'>) => Promise<void>;
  getCheckins: () => Promise<void>;
}

export const useRoutineStore = create<RoutineState>((set) => ({
  routines: [],
  checkins: [],
  addRoutine: async (routine) => {
    // Simula chamada à API
    set((state) => ({
      routines: [...state.routines, { ...routine, id: Date.now().toString() }],
    }));
  },
  getRoutines: async () => {
    // Simula chamada à API
    set({ routines: mockRoutines });
  },
  addCheckin: async (checkin) => {
    // Simula chamada à API
    set((state) => ({
      checkins: [...state.checkins, { ...checkin, id: Date.now().toString() }],
    }));
  },
  getCheckins: async () => {
    // Simula chamada à API
    set({ checkins: mockCheckins });
  },
})); 