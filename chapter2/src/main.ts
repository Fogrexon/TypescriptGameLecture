import { CANVAS_HEIGHT, CANVAS_WIDTH } from './game';
// import { gameStart } from './game/init';
import { gameStart } from './game/path';
import { awaitQuerySelector } from './lib';

(async () => {
  const canvas = await awaitQuerySelector('#canvas');
  if (canvas instanceof HTMLCanvasElement) {
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    const ctx = canvas.getContext('2d');
    ctx && gameStart(canvas, ctx);
  }
})();
