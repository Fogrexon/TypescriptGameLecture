import { Network } from "../Network";
import { IScreenControllable } from "../Screen/ScreenManager";
import { globalState } from "../globalState";

export class Title implements IScreenControllable {

  private parent: HTMLElement;
  constructor(parent: HTMLElement, network: Network) {
    this.parent = parent;
  }

  private initialize() {
    const nameField = this.parent.querySelector('#name') as HTMLInputElement;
    const joinButton = this.parent.querySelector('#join') as HTMLButtonElement;

    nameField.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement;
      // 本来ならここに名前のバリデーションを入れる
      globalState.playerName = target.value;
    })
  }


  public startScreen(): void {
    console.log('start title')
  }
  public endScreen(): void {
    console.log('end title')
  }
}