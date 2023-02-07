import mitt, { Emitter } from "mitt";
import { Mover, Ball, Score } from "./State";
import { WebsocketEvent } from "./Event";
import { RoomInfo } from "./Room";

export class Network {
  
  public readonly eventEmitter: Emitter<WebsocketEvent>;

  private websocket: WebSocket;

  constructor(public name: string, public address: string) {
    this.eventEmitter = mitt();
    this.websocket = new WebSocket(address);
  }

  // PUBLIC 
  public async sendPlayerState() {

  }

  // PRIVATE
  private websocketHandler() {

  }

  private fireUpdateGameEvent() {
    this.eventEmitter.emit('updateGame', {
      player: {
        x: 0,
        y: 0
      },
      enemy: {
        x: 0,
        y: 0
      },
      ball: {
        x: 0,
        y: 0
      }
    })
  }

  private fireReadyEvent() {
    this.eventEmitter.emit('readyRoom', {
      enemy: '',
      startTime: new Date(),
      endTime: new Date()
    })
  }

  private fireEndEvent() {
    this.eventEmitter.emit('end', {
      win: true,
      score: 0
    })
  }
}