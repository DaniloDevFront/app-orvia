import { create } from "zustand";
import { Routine, RoutinesByMonth } from "@shared/models/routine";

interface RoutineState {
  routines: Routine[];
  routinesByMonth: RoutinesByMonth | null;
  loading: boolean;
  error: string | null;
  getRoutines: () => Promise<void>;
  getRoutinesByMonth: (month: number, year: number) => Promise<void>;
  addRoutine: (routine: Omit<Routine, "id" | "createdAt" | "updatedAt" | "isActive">) => Promise<void>;
  updateRoutine: (id: string, routine: Partial<Routine>) => Promise<void>;
  deleteRoutine: (id: string) => Promise<void>;
}

// Mock data para desenvolvimento
const mockRoutines: Routine[] = [
  {
    id: "1",
    userId: "1",
    name: "Rotina 1",
    weekDays: ["T", "S"],
    time: "08:00",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
  },
];

export const useRoutineStore = create<RoutineState>((set, get) => ({
  routines: [],
  routinesByMonth: null,
  loading: false,
  error: null,

  getRoutines: async () => {
    set({ loading: true, error: null });
    try {
      // TODO: Implementar chamada à API
      set({ routines: mockRoutines });
    } catch (error) {
      set({ error: "Erro ao buscar rotinas" });
    } finally {
      set({ loading: false });
    }
  },

  getRoutinesByMonth: async (month: number, year: number) => {
    set({ loading: true, error: null });
    try {
      // TODO: Implementar chamada à API
      // Por enquanto, vamos simular os dados
      const routinesByMonth: RoutinesByMonth = {
        month,
        year,
        weeks: [
          {
            weekNumber: 1,
            routines: mockRoutines,
          },
        ],
      };
      set({ routinesByMonth });
    } catch (error) {
      set({ error: "Erro ao buscar rotinas do mês" });
    } finally {
      set({ loading: false });
    }
  },

  addRoutine: async (routineData) => {
    set({ loading: true, error: null });
    try {
      // TODO: Implementar chamada à API
      const newRoutine: Routine = {
        ...routineData,
        id: Math.random().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
      };
      set((state) => ({
        routines: [...state.routines, newRoutine],
      }));
    } catch (error) {
      set({ error: "Erro ao adicionar rotina" });
    } finally {
      set({ loading: false });
    }
  },

  updateRoutine: async (id, routineData) => {
    set({ loading: true, error: null });
    try {
      // TODO: Implementar chamada à API
      set((state) => ({
        routines: state.routines.map((routine) =>
          routine.id === id
            ? {
              ...routine,
              ...routineData,
              updatedAt: new Date().toISOString(),
            }
            : routine
        ),
      }));
    } catch (error) {
      set({ error: "Erro ao atualizar rotina" });
    } finally {
      set({ loading: false });
    }
  },

  deleteRoutine: async (id) => {
    set({ loading: true, error: null });
    try {
      // TODO: Implementar chamada à API
      set((state) => ({
        routines: state.routines.filter((routine) => routine.id !== id),
      }));
    } catch (error) {
      set({ error: "Erro ao excluir rotina" });
    } finally {
      set({ loading: false });
    }
  },
})); 