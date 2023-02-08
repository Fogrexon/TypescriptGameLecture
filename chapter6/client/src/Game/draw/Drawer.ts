export interface IDrawable {
  draw(ctx: CanvasRenderingContext2D): void
}

/**
 * 描画用クラスをまとめて起動するクラス
 */
export class Drawer {
  private contents: IDrawable[] = [];
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  constructor(canvas: HTMLCanvasElement) {
    this.contents = []
    this.canvas = canvas
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  }

  public add(content: IDrawable) {
    this.contents.push(content)
  }

  public draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.contents.forEach(content => content.draw(this.ctx))
  }
}