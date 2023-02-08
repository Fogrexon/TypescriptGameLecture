/**
 * ゲームに使うステートの型
 */

export interface Mover {
  x: number;
  y: number;
}

export interface Ball {
  x: number;
  y: number;
}

export interface GameState {
  playerState: Mover;
  enemyState: Mover;
  ballState: Ball;
  scoreState: Score;
}

export interface Score {
  playerScore: number;
  enemyScore: number;
}