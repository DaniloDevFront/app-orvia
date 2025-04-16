import { create } from 'zustand';
import { Feedback } from '@state/models';
import { mockFeedbacks } from '@state/data/mockData';

interface FeedbackState {
  feedbacks: Feedback[];
  getFeedbacks: () => Promise<void>;
  markFeedbackAsHelpful: (id: string, isHelpful: boolean) => Promise<void>;
}

export const useFeedbackStore = create<FeedbackState>((set) => ({
  feedbacks: [],
  getFeedbacks: async () => {
    // Simula chamada à API
    set({ feedbacks: mockFeedbacks });
  },
  markFeedbackAsHelpful: async (id: string, isHelpful: boolean) => {
    // Simula chamada à API
    set((state) => ({
      feedbacks: state.feedbacks.map((feedback) =>
        feedback.id === id ? { ...feedback, isHelpful } : feedback
      ),
    }));
  },
})); 