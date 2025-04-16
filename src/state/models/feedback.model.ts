import { FeedbackType } from '@shared/enums';

export type Feedback = {
  id: string;
  userId: string;
  date: string;
  text: string;
  type: FeedbackType;
  context?: string;
  isHelpful?: boolean;
}; 