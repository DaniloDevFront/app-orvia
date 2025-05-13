import { create } from 'zustand';
import mockSuggestions from '../data/mock_suggestions_spotify.json';
import { Suggestion } from '@state/models/suggestion.model';
import { EmotionType } from '@shared/enums';

interface SuggestionStore {
  suggestions: Suggestion[];
  loading: boolean;
  error: string | null;
  findSuggestions: (emotionType: EmotionType) => void;
}

export const useSuggestionStore = create<SuggestionStore>((set) => ({
  suggestions: [],
  loading: false,
  error: null,

  findSuggestions: () => {
    set({ loading: true, error: null });
    try {
      const data = mockSuggestions as Suggestion[];
      set({ suggestions: data, loading: false });
    } catch (err) {
      set({ error: 'Erro ao carregar sugestões.', loading: false });
    }
  },
}));
