export const gameStart = (
  _: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) => {
  ctx.fillStyle = 'black';
  // 三角形 (fill)
  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.lineTo(200, 100);
  ctx.lineTo(150, 200);
  ctx.closePath();
  ctx.fill();
  // 円 (fill)
  ctx.beginPath();
  ctx.arc(300, 150, 50, 0, Math.PI * 2, false);
  ctx.fill();
  // 線 （stroke)
  ctx.beginPath();
  ctx.moveTo(400, 100);
  ctx.lineTo(500, 100);
  ctx.lineTo(450, 200);
  ctx.closePath();
  ctx.stroke();
  // 円弧（stroke)
  ctx.beginPath();
  ctx.arc(600, 150, 50, 0, (Math.PI * 2) / 3, false);
  ctx.stroke();
};
