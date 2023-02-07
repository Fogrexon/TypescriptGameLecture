export interface Mover {
  x: number;
  y: number;
}

export interface Ball {
  x: number;
  y: number;
}

export interface GameState {
  timestamp: Date;
  playerState: Mover;
  enemyState: Mover;
  ballState: Ball;
  scoreState: Score;
}

export interface Score {
  score: number;
}