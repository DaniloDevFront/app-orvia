import { create } from 'zustand';
import { User } from '../models';
import { mockUser } from '../data/mockData';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    // Simula chamada à API
    set({ user: mockUser, isAuthenticated: true });
  },
  register: async (name: string, email: string, password: string) => {
    // Simula chamada à API
    set({ user: mockUser, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
})); 