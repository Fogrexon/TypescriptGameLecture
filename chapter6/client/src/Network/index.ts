import mitt, { Emitter } from 'mitt';
import { WebSocketEvent } from './Event';
import {
  ClientToServerEvent,
  EndMessage,
  ReadyMessage,
  ServerToClientEvent,
  UpdateGameMessage,
  UpdateScoreMessage,
} from './Message';
import { Socket, io } from 'socket.io-client';

/**
 * 鯖との通信を行うクラス
 */
export class Network {
  public readonly eventEmitter: Emitter<WebSocketEvent>;

  private websocket: Socket<ServerToClientEvent, ClientToServerEvent>;

  constructor(public address: string) {
    this.eventEmitter = mitt();
    this.websocket = io(address);
    
    this.websocket.on('connect', (socket) => {
      const engine = this.websocket.io.engine;

      engine.on("update-game", this.fireUpdateGameEvent.bind(this));
      engine.on("update-score", this.fireUpdateScoreEvent.bind(this));
      engine.on("ready", this.fireReadyEvent.bind(this));
      engine.on("end", this.fireEndEvent.bind(this));
    })
  }

  /**
   * ゲームの状態を更新するイベントを発火する
   */
  public async sendPlayerState() {
    this.websocket.send(
      JSON.stringify({
        type: 'update-player',
        data: {
          x: 0,
          y: 0,
        },
      })
    );
  }

  /**
   * ユーザー名を指定して部屋に参加する
   * @param name ユーザー名
   */
  public async sendJoinRoom(name: string) {
    this.websocket.send(
      JSON.stringify({
        type: 'join-room',
        data: {
          name,
        },
      })
    );
  }

  // PRIVATE

  /**
   * ゲーム全体の状態のアップデート
   * @param message
   */
  private fireUpdateGameEvent(message: UpdateGameMessage) {
    this.eventEmitter.emit('update-game', {
      player: {
        x: message.player.x,
        y: message.player.y,
      },
      enemy: {
        x: message.enemy.x,
        y: message.enemy.y,
      },
      ball: {
        x: message.enemy.x,
        y: message.ball.y,
      },
    });
  }

  /**
   * スコア更新イベント
   * @param message
   */
  private fireUpdateScoreEvent(message: UpdateScoreMessage) {
    this.eventEmitter.emit('update-score', {
      playerScore: message.playerScore,
      enemyScore: message.enemyScore,
    });
  }

  /**
   * 相手が参加して準備ができたときのイベント
   * @param message
   */
  private fireReadyEvent(message: ReadyMessage) {
    this.eventEmitter.emit('ready', {
      enemy: message.enemy,
      startTime: new Date(message.startTime),
      endTime: new Date(message.endTime),
    });
  }

  /**
   * ゲーム終了イベント
   * @param message
   */
  private fireEndEvent(message: EndMessage) {
    this.eventEmitter.emit('end', {
      playerScore: message.playerScore,
      enemyScore: message.enemyScore,
    });
  }
}
