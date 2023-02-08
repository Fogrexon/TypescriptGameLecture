import { GameState } from "../../Network/State";
import { IDrawable } from "./Drawer";

/**
 * ゲームの描画におけるサイズ
 * 横幅、縦幅をそれぞれ1としたときの比率
 */
const COMPONENT_SIZE = {
  MOVER: {
    WIDTH: 0.3,
    HEIGHT: 0.04
  },
  BALL_RADIUS: 0.02
}

export class GameMain implements IDrawable {
  private componentState = {
    playerState: {
      x: 0,
      y: 0
    },
    enemyState: {
      x: 0,
      y: 0
    },
    ballState: {
      x: 0,
      y: 0
    },
  }

  public update(gameState: GameState) {
    this.componentState.playerState = gameState.playerState;
    this.componentState.enemyState = gameState.enemyState;
    this.componentState.ballState = gameState.ballState;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.save();

    const halfWidth = ctx.canvas.width / 2;
    const halfHeight = ctx.canvas.height / 2;

    ctx.translate(halfWidth, halfHeight);
    ctx.scale(1 / halfWidth, 1 / halfHeight);
    ctx.fillStyle = 'blue';
    ctx.fillRect(
      this.componentState.playerState.x - COMPONENT_SIZE.MOVER.WIDTH / 2,
      this.componentState.playerState.y - COMPONENT_SIZE.MOVER.HEIGHT / 2,
      COMPONENT_SIZE.MOVER.WIDTH,
      COMPONENT_SIZE.MOVER.HEIGHT
      );
    ctx.fillStyle = 'red';
    ctx.fillRect(
      this.componentState.enemyState.x - COMPONENT_SIZE.MOVER.WIDTH / 2,
      this.componentState.enemyState.y - COMPONENT_SIZE.MOVER.HEIGHT / 2,
      COMPONENT_SIZE.MOVER.WIDTH,
      COMPONENT_SIZE.MOVER.HEIGHT
    );
    ctx.fillStyle = 'black'
    ctx.arc(this.componentState.ballState.x, this.componentState.ballState.y, COMPONENT_SIZE.BALL_RADIUS, 0, Math.PI * 2, false)
    ctx.restore();
  }
}