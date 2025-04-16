import { create } from 'zustand';
import { Emotion } from '@state/models';
import { mockEmotions } from '@state/data/mockData';

interface EmotionState {
  emotions: Emotion[];
  addEmotion: (emotion: Omit<Emotion, 'id'>) => Promise<void>;
  getEmotions: () => Promise<void>;
}

export const useEmotionStore = create<EmotionState>((set) => ({
  emotions: [],
  addEmotion: async (emotion) => {
    // Simula chamada à API
    set((state) => ({
      emotions: [...state.emotions, { ...emotion, id: Date.now().toString() }],
    }));
  },
  getEmotions: async () => {
    // Simula chamada à API
    set({ emotions: mockEmotions });
  },
})); 