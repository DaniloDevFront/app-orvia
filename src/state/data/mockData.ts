import { User, Emotion, Routine, Checkin, Feedback } from '../models/types';

export const mockUser: User = {
  id: '1',
  name: 'Mariana',
  email: 'mariana@email.com',
  type: 'user',
};

export const mockEmotions: Emotion[] = [
  {
    id: '1',
    userId: '1',
    date: '2024-03-23',
    type: 'happy',
    text: 'Me senti muito bem hoje!',
    sentiment: 0.8,
  },
  {
    id: '2',
    userId: '1',
    date: '2024-03-22',
    type: 'sad',
    text: 'Estou me sentindo para baixo.',
    sentiment: -0.6,
  },
  {
    id: '3',
    userId: '1',
    date: '2024-03-21',
    type: 'neutral',
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
  },
];

export const mockCheckins: Checkin[] = [
  {
    id: '1',
    userId: '1',
    routineId: '1',
    date: '2024-03-23',
    status: 'completed',
  },
  {
    id: '2',
    userId: '1',
    routineId: '1',
    date: '2024-03-22',
    status: 'missed',
  },
];

export const mockFeedbacks: Feedback[] = [
  {
    id: '1',
    userId: '1',
    date: '2024-03-23',
    text: 'Ótimo trabalho em ir à academia hoje!',
    type: 'motivational',
    context: 'Após completar rotina da academia',
  },
  {
    id: '2',
    userId: '1',
    date: '2024-03-22',
    text: 'Você anotou tristeza e deixou duas vezes na semana. isso pode estar relacionado.',
    type: 'reflective',
    context: 'Análise semanal de humor',
  },
  {
    id: '3',
    userId: '1',
    date: '2024-03-21',
    text: 'Pode ajudar anotar mais sobre como está se sentindo.',
    type: 'suggestion',
    context: 'Registro de humor sem texto',
  },
]; 