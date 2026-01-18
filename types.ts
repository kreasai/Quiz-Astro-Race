export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

export enum GameStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED',
}

export interface PlayerResult {
  playerId: number;
  score: number;
  lives: number;
  didWin: boolean;
  reason: 'SCORE' | 'OPPONENT_DIED' | 'SURVIVED';
}

export interface PlayerState {
  lives: number;
  score: number;
  currentQuestionIndex: number;
  isAlive: boolean;
  hasFinished: boolean;
}