export const gameStart = (
  _: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) => {
  ctx.fillStyle = 'black';
  ctx.font = '48px sans-serif';
  ctx.textBaseline = 'top';
  ctx.fillText('Chapter2 Canvas', 0, 0);
  ctx.fillRect(100, 100, 100, 100);
};
