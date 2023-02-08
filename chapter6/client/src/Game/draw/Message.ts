import { IDrawable } from "./Drawer";

export class Message implements IDrawable {
  private message: string = '';
  private color: string = 'black';
  private size: number = 30;

  public update(message: string, color: string = 'black', size: number = 30) {
    this.message = message;
    this.color = color;
    this.size = size;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.save();

    const halfWidth = ctx.canvas.width / 2;
    const halfHeight = ctx.canvas.height / 2;

    ctx.fillStyle = this.color;
    ctx.font = `${this.size}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.message, halfWidth - 50, halfHeight);
    ctx.restore();
  }
}