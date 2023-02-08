import { Ball, Mover } from "./State";

export type UpdateGameEvent = {
  player: Mover;
  enemy: Mover;
  ball: Ball;
}

export type UpdateScoreEvent = {
  playerScore: number
  enemyScore: number
}

export type ReadyEvent = {
  enemy: string
  startTime: Date
  endTime: Date
}
export type EndEvent = {
  playerScore: number;
  enemyScore: number;
}

export type WebSocketEvent = {
  ready: ReadyEvent
  end: EndEvent,
  'update-game': UpdateGameEvent
  'update-score': UpdateScoreEvent
}
