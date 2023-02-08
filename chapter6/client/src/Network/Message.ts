export interface UpdateGameMessage {
  player: {
    x: number,
    y: number
  }
  enemy: {
    x: number
    y: number
  }
  ball: {
    x: number
    y: number
  }
}

export interface UpdateScoreMessage {
  playerScore: number
  enemyScore: number
}

export interface ReadyMessage {
  enemy: string
  startTime: Date
  endTime: Date
}

export interface EndMessage {
  playerScore: number
  enemyScore: number
}

export type WebSocketMessage = {
  type: 'update-game'
  data: UpdateGameMessage
} | {
  type: 'update-score'
  data: UpdateScoreMessage
} | {
  type: 'ready-room'
  data: ReadyMessage
} | {
  type: 'end'
  data: EndMessage
}