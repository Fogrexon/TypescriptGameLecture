/**
 * ゲームに使うステートの型
 */

export interface MoverInfo {
  x: number;
  y: number;
}

export interface BallInfo {
  x: number;
  y: number;
}

export interface ScoreInfo {
  playerScore: number;
  enemyScore: number;
}

export interface GameInfo {
  playerState: MoverInfo;
  enemyState: MoverInfo;
  ballState: BallInfo;
  scoreState: ScoreInfo;
}
