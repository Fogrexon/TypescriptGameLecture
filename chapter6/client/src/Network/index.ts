import mitt, { Emitter } from "mitt";
import { WebSocketEvent } from "./Event";
import { EndMessage, ReadyMessage, UpdateGameMessage, UpdateScoreMessage, WebSocketMessage } from "./Message";

export class Network {
  
  public readonly eventEmitter: Emitter<WebSocketEvent>;

  private websocket: WebSocket;

  constructor(public name: string, public address: string) {
    this.eventEmitter = mitt();
    this.websocket = new WebSocket(address);
    this.websocket.addEventListener('message', this.websocketHandler.bind(this));
  }

  // PUBLIC 
  public async sendPlayerState() {
    this.websocket.send(JSON.stringify({
      type: 'update-player',
      data: {
        x: 0,
        y: 0
      }
    }))
  }

  public async sendJoinRoom(name: string) {
    this.websocket.send(JSON.stringify({
      type: 'join-room',
      data: {
        name
      }
    }))
  }

  // PRIVATE
  private websocketHandler(event: MessageEvent) {
    const data = JSON.parse(event.data) as WebSocketMessage;
    switch (event.type) {
      case 'update-game':
        this.fireUpdateGameEvent(data.data as UpdateGameMessage);
        break;
      case 'update-score':
        this.fireUpdateScoreEvent(data.data as UpdateScoreMessage);
        break;
      case 'ready-room':
        this.fireReadyEvent(data.data as ReadyMessage);
        break;
      case 'end':
        this.fireEndEvent(data.data as EndMessage);
        break;
      default:
        break;
    }
  }

  private fireUpdateGameEvent(message: UpdateGameMessage) {
    this.eventEmitter.emit('update-game', {
      player: {
        x: message.player.x,
        y: message.player.y
      },
      enemy: {
        x: message.enemy.x,
        y: message.enemy.y
      },
      ball: {
        x: message.enemy.x,
        y: message.ball.y
      }
    })
  }

  private fireUpdateScoreEvent(message: UpdateScoreMessage) {
    this.eventEmitter.emit('update-score', {
      playerScore: message.playerScore,
      enemyScore: message.enemyScore
    })
  }

  private fireReadyEvent(message: ReadyMessage) {
    this.eventEmitter.emit('ready', {
      enemy: message.enemy,
      startTime: new Date(message.startTime),
      endTime: new Date(message.endTime)
    })
  }

  private fireEndEvent(message: EndMessage) {
    this.eventEmitter.emit('end', {
      playerScore: message.playerScore,
      enemyScore: message.enemyScore
    })
  }
}