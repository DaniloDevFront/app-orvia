import { EmotionType } from '@shared/enums';

export type Emotion = {
  id: string;
  userId: string;
  date: string;
  type: EmotionType;
  text?: string;
  sentiment: number; // -1 to 1
}; 