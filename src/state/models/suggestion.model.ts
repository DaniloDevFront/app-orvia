import { EmotionType } from "@shared/enums";
export type ContentType = 'SPOTIFY_PLAYLIST' | 'SPOTIFY_PODCAST' | 'NETFLIX';
export type ContentProvider = 'SPOTIFY' | 'NETFLIX';

export interface Content {
  id: string;
  type: ContentType;
  title: string;
  url: string;
  imageUrl: string;
  description?: string;
  provider: ContentProvider;
}

export interface Suggestion {
  id: string;
  userId: string;
  type: ContentType;
  message: string;
  content: Content;
  createdAt: string;
  emotionType: EmotionType;
  isActive: boolean;
  isLiked: boolean;
  isDisliked: boolean;
}

export interface SuggestionResponse {
  suggestion: Suggestion;
  success: boolean;
  error?: string;
}
