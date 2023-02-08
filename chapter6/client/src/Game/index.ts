import { Network } from "../Network";
import { IScreenControllable } from "../Screen/ScreenManager";
import { Drawer } from "./draw/Drawer";

export class Game implements IScreenControllable {
  private ctx: CanvasRenderingContext2D;
  private drawer: Drawer;
  constructor(private canvas: HTMLCanvasElement, private network: Network) {
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  }
  public startScreen(): void {
    this.network.
    console.log('game start')
  }
  public endScreen(): void {
    console.log('game end')
  }
}