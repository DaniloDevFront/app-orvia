import { Content } from '@state/models/suggestion.model';

export function getMediaButtonLabel(content: Content): string {
  if (content.provider === 'SPOTIFY') {
    return 'Ouvir agora';
  }
  if (content.provider === 'NETFLIX') {
    return 'Assistir agora';
  }
  return 'Acessar';
}

export function getMediaTitle(content: Content): string {
  if (content.provider === 'SPOTIFY') {
    return `Playlist: ${content.title}`;
  }

  return content.title;
}

export function getMediaProvider(content: Content): string {
  switch (content.provider) {
    case 'SPOTIFY':
      return 'Spotify';
    case 'NETFLIX':
      return 'Netflix';
    default:
      return 'Play';
  }
}

export function getMediaIcon(content: Content): string {
  switch (content.provider) {
    case 'SPOTIFY':
      return 'spotify';
    case 'NETFLIX':
      return 'netflix';
    default:
      return 'play-circle';
  }
}

export function getMediaIconColor(content: Content): string {
  switch (content.provider) {
    case 'SPOTIFY':
      return '#1DB954';
    case 'NETFLIX':
      return '#E50914';
    default:
      return '#7E06F2';
  }
} 