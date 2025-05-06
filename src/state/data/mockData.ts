import { CheckinStatus, EmotionType, FeedbackType, ROLES } from '@shared/enums';
import { User, Emotion, Routine, Checkin, Feedback } from '@state/models';

export const mockUser: User = {
  id: 1,
  email: 'mariana@email.com',
  role: [ROLES.USER],
  created_at: '',
  updated_at: '',
  profile: {
    id: 1,
    name: 'Mariana',
    created_at: '',
    updated_at: ''
  }
};

export const mockEmotions: Emotion[] = [
  {
    id: '1',
    userId: '1',
    date: '2024-03-23',
    type: EmotionType.HAPPY,
    text: 'Me senti muito bem hoje!',
    sentiment: 0.8,
  },
  {
    id: '2',
    userId: '1',
    date: '2024-03-22',
    type: EmotionType.SAD,
    text: 'Estou me sentindo para baixo.',
    sentiment: -0.6,
  },
  {
    id: '3',
    userId: '1',
    date: '2024-03-21',
    type: EmotionType.NEUTRAL,
    text: 'Me senti OK hoje.',
    sentiment: 0,
  },
];

export const mockRoutines: Routine[] = [
  {
    id: '1',
    userId: '1',
    name: 'Academia',
    weekDays: ['S', 'T', 'Q'],
    latitude: -23.5505,
    longitude: -46.6333,
    time: '08:00',
    icon: 'assets/ico-academy.png',
  },
];

export const mockCheckins: Checkin[] = [
  {
    id: '1',
    userId: '1',
    routineId: '1',
    date: '2024-03-23',
    status: CheckinStatus.COMPLETED,
  },
  {
    id: '2',
    userId: '1',
    routineId: '1',
    date: '2024-03-22',
    status: CheckinStatus.MISSED,
  },
];

export const mockFeedbacks: Feedback[] = [
  {
    id: '1',
    userId: '1',
    date: '2024-03-23',
    text: 'Ótimo trabalho em ir à academia hoje!',
    type: FeedbackType.MOTIVATIONAL,
    context: 'Após completar rotina da academia',
  },
  {
    id: '2',
    userId: '1',
    date: '2024-03-22',
    text: 'Você anotou tristeza e deixou duas vezes na semana. isso pode estar relacionado.',
    type: FeedbackType.REFLECTIVE,
    context: 'Análise semanal de humor',
  },
  {
    id: '3',
    userId: '1',
    date: '2024-03-21',
    text: 'Pode ajudar anotar mais sobre como está se sentindo.',
    type: FeedbackType.SUGGESTION,
    context: 'Registro de humor sem texto',
  },
]; 