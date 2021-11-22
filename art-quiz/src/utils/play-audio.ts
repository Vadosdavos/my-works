import { settings } from '../app';

export function playAudio() {
  const url =
    'https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3';
  const audio = new Audio(url);
  if (settings.audio) {
    audio.play();
  }
}

export function playCorrect() {
  const url =
    'https://assets.mixkit.co/sfx/preview/mixkit-quick-win-video-game-notification-269.mp3';
  const audio = new Audio(url);
  if (settings.audio) {
    audio.play();
  }
}

export function playWrong() {
  const url =
    'https://assets.mixkit.co/sfx/preview/mixkit-click-error-1110.mp3';
  const audio = new Audio(url);
  if (settings.audio) {
    audio.play();
  }
}

export function playFinish() {
  const url =
    'https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-complete-or-approved-mission-205.mp3';
  const audio = new Audio(url);
  if (settings.audio) {
    audio.play();
  }
}
