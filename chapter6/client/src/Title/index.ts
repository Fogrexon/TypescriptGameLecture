import { Network } from "../Network";
import { IScreenControllable, ScreenManager } from "../Screen/ScreenManager";
import { globalState } from "../globalState";

export class Title implements IScreenControllable {

  // dom関連
  private parent: HTMLElement;
  private nameField: HTMLInputElement;
  private joinButton: HTMLButtonElement;
  
  // 通信関連
  private network: Network;

  constructor(parent: HTMLElement, network: Network) {
    this.parent = parent;
    this.nameField = this.parent.querySelector('#name') as HTMLInputElement;
    this.joinButton = this.parent.querySelector('#join') as HTMLButtonElement;
    this.network = network;
  }

  /**
   * タイトル画面開始
   */
  public startScreen(): void {
    this.parent.dataset.visible = 'true'
    this.joinButton.addEventListener('click', this.joinButtonHandler.bind(this));
  }
  /**
   * タイトル画面終了
   * ゲーム画面へ移動
   */
  public endScreen(): void {
    this.parent.dataset.visible = 'false'
    this.joinButton.removeEventListener('click', this.joinButtonHandler.bind(this));
  }

  /**
   * 参加ボタンが押されたときの処理
   */
  private joinButtonHandler(): void {
    this.network.sendJoinRoom(this.nameField.value);
    globalState.playerName = this.nameField.value;
    ScreenManager.moveScreen('game');
  }
}