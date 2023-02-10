import { Network } from '../Network';
import { EndEvent, ReadyEvent, UpdateGameEvent, UpdateScoreEvent } from '../Network/Event';
import { IScreenControllable, ScreenManager } from '../Screen/ScreenManager';
import { Drawer } from './draw/Drawer';
import { GameMain } from './draw/GameMain';
import { Message } from './draw/Message';
import { Score } from './draw/Score';

type GameState = 'ready' | 'countdown' | 'playing' | 'end';

export class Game implements IScreenControllable {
  private ctx: CanvasRenderingContext2D;
  private gameMainDrawer: GameMain;
  private messageDrawer: Message;
  private scoreDrawer: Score;
  private drawer: Drawer;

  private intervalId: number = -1;

  private gameState: GameState = 'ready';

  // gameInfo
  private startTime = new Date();
  private endTime = new Date();
  // playing
  private playerInfo = {
    x: 0,
    y: 0,
  };

  private enemyInfo = {
    x: 0,
    y: 0,
  };

  private ballInfo = {
    x: 0,
    y: 0,
  };

  constructor(private wrapper: HTMLElement, canvas: HTMLCanvasElement, private network: Network) {
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
    this.wrapper.dataset.visible = 'true';

    this.network.eventEmitter.on('update-game', this.updateGameHandler.bind(this));
    this.network.eventEmitter.on('update-score', this.updateScoreHandler.bind(this));
    this.network.eventEmitter.on('ready', this.readyHandler.bind(this));
    this.network.eventEmitter.on('end', this.endHandler.bind(this));

    this.gameState = 'ready';
    this.messageDrawer.update('Waiting', 'balck');

    this.intervalId = window.setInterval(this.update.bind(this), 1000 / 60);
  }
  public endScreen(): void {
    this.wrapper.dataset.visible = 'false';

    this.network.eventEmitter.off('update-game', this.updateGameHandler.bind(this));
    this.network.eventEmitter.off('update-score', this.updateScoreHandler.bind(this));
    this.network.eventEmitter.off('ready', this.readyHandler.bind(this));
    this.network.eventEmitter.off('end', this.endHandler.bind(this));

    this.messageDrawer.update('');

    window.clearInterval(this.intervalId);
  }

  private update(): void {
    switch (this.gameState) {
      case 'ready':
        break;
      case 'countdown': {
        const delta = Math.floor((new Date().getTime() - this.startTime.getTime()) / 1000);
        if (delta < 0) {
          this.gameState = 'playing';
          this.messageDrawer.update('');
        } else this.messageDrawer.update(`${delta}`);
        break;
      }
      case 'playing':
        // プレイヤーの操作方法

        break;
      case 'end': {
        const delta = (new Date().getTime() - this.endTime.getTime()) / 1000;
        if (delta > 3) {
          ScreenManager.moveScreen('title');
        }
        break;
      }
    }

    this.drawer.draw();
  }

  private updateGameHandler(event: UpdateGameEvent) {
    this.enemyInfo = event.enemy;
    this.ballInfo = event.ball;
    this.gameMainDrawer.update(this.playerInfo, this.enemyInfo, this.ballInfo);
  }

  private updateScoreHandler(event: UpdateScoreEvent) {
    this.scoreDrawer.update(event.playerScore, event.enemyScore);
  }

  private readyHandler(event: ReadyEvent) {
    this.gameState = 'countdown';
    this.startTime = new Date(event.startTime);
    this.endTime = new Date(event.endTime);
  }

  private endHandler(event: EndEvent) {
    this.gameState = 'end';
    this.scoreDrawer.update(event.playerScore, event.enemyScore);

    if (event.playerScore > event.enemyScore) {
      this.messageDrawer.update('You Win!', 'blue');
    } else if (event.playerScore < event.enemyScore) {
      this.messageDrawer.update('You Lose...', 'red');
    } else {
      this.messageDrawer.update('Draw', 'green');
    }
  }
}
