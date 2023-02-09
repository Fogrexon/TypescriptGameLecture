import { Network } from "../Network";
import { IScreenControllable } from "../Screen/ScreenManager";
import { Drawer } from "./draw/Drawer";
import { GameMain } from "./draw/GameMain";
import { Message } from "./draw/Message";
import { Score } from "./draw/Score";

type GameState = 'ready' | 'countdown' | 'playing' | 'end'

export class Game implements IScreenControllable {
  private ctx: CanvasRenderingContext2D;
  private gameMainDrawer: GameMain;
  private messageDrawer: Message;
  private scoreDrawer: Score
  private drawer: Drawer;

  private intervalId: number = -1;

  private gameState: GameState = 'ready'

  // gameInfo
  private startTime = new Date()
  private endTime = new Date()
  // playing
  private playerInfo = {
    x: 0,
    y: 0,
  }

  constructor(canvas: HTMLCanvasElement, private network: Network) {
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    this.gameMainDrawer = new GameMain();
    this.messageDrawer = new Message();
    this.scoreDrawer = new Score();

    // 描画クラス
    this.drawer = new Drawer(canvas);
    this.drawer.add(this.gameMainDrawer);
    this.drawer.add(this.messageDrawer);
    this.drawer.add(this.scoreDrawer);

  }

  public startScreen(): void {
    this.network.eventEmitter.on('update-game', this.updateGameHandler.bind(this))
    this.network.eventEmitter.on('update-score', this.updateScoreHandler.bind(this))
    this.network.eventEmitter.on('ready', this.readyHandler.bind(this))
    this.network.eventEmitter.on('end', this.endHandler.bind(this))

    this.gameState = 'ready'
    this.messageDrawer.update('Waiting', 'balck')

    this.intervalId = window.setInterval(this.update.bind(this), 1000 / 60)
  }
  public endScreen(): void {
    this.network.eventEmitter.off('update-game', this.updateGameHandler.bind(this))
    this.network.eventEmitter.off('update-score', this.updateScoreHandler.bind(this))
    this.network.eventEmitter.off('ready', this.readyHandler.bind(this))
    this.network.eventEmitter.off('end', this.endHandler.bind(this))

    window.clearInterval(this.intervalId)
  }

  private update(): void {

    switch (this.gameState) {
      case 'ready':
        break;
      case 'countdown':
        const delta = Math.floor(new Date().getTime() - this.startTime.getTime())
        this.messageDrawer.update(`${delta}`)
        break;
      case 'playing':
        // プレイヤーの操作方法
        this.messageDrawer.update('Playing')
        break;
      case 'end':
        this.messageDrawer.update('End')
        break;
    }

    this.drawer.draw();
  }

  private updateGameHandler() {

  }

  private updateScoreHandler() {
  }

  private readyHandler() {

  }

  private endHandler() {

  }


}