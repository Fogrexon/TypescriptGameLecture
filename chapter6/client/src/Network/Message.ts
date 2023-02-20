/**
 * WebSocketからの生メッセージ
 */

export interface UpdateGameMessage {
  player: {
    x: number;
    y: number;
  };
  enemy: {
    x: number;
    y: number;
  };
  ball: {
    x: number;
    y: number;
  };
}

export interface UpdateScoreMessage {
  playerScore: number;
  enemyScore: number;
}

export interface ReadyMessage {
  enemy: string;
  startTime: Date;
  endTime: Date;
}

export interface EndMessage {
  playerScore: number;
  enemyScore: number;
}

export interface UpdatePlayerMessage {
  x: number;
  y: number;
}
export interface JoinRoomMessage {
  name: string;
}

export interface ServerToClientEvent {
  'update-game': (event: UpdateGameMessage) => void;
  'update-score': (event: UpdateScoreMessage) => void;
  ready: (event: ReadyMessage) => void;
  end: (event: EndMessage) => void;
}
export interface ClientToServerEvent {
  'update-player': (event: UpdatePlayerMessage) => void;
  'join-room': (event: JoinRoomMessage) => void;
}
