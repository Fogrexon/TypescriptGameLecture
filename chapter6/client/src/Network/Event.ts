import { BallInfo, MoverInfo } from './State';

/**
 * ゲーム内で発生するイベントの型定義
 */
export type UpdateGameEvent = {
  player: MoverInfo;
  enemy: MoverInfo;
  ball: BallInfo;
};

export type UpdateScoreEvent = {
  playerScore: number;
  enemyScore: number;
};

export type ReadyEvent = {
  enemy: string;
  startTime: Date;
  endTime: Date;
};
export type EndEvent = {
  playerScore: number;
  enemyScore: number;
};

export type WebSocketEvent = {
  ready: ReadyEvent;
  end: EndEvent;
  'update-game': UpdateGameEvent;
  'update-score': UpdateScoreEvent;
};
