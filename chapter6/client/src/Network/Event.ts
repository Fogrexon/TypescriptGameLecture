import { RoomInfo } from "./Room";
import { Ball, Mover } from "./State";

export type UpdateGameEvent = {
  player: Mover;
  enemy: Mover;
  ball: Ball;
}


export type ReadyEvent = {
  enemy: string
  startTime: Date
  endTime: Date
}
export type EndEvent = {
  win: boolean;
  score: number;
}

export type WebsocketEvent = {
  'ready-room': ReadyEvent
  end: EndEvent,
  'update-game': UpdateGameEvent
}
