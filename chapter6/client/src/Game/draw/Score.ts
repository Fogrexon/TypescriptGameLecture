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
  private scoreState = {
    playerScore: 0,
    enemyScore: 0
  };

  public update(playerScore: number, enemyScore: number) {
    this.scoreState.playerScore = playerScore;
    this.scoreState.enemyScore = enemyScore;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.save();

    const halfWidth = ctx.canvas.width / 2;
    const halfHeight = ctx.canvas.height / 2;

    ctx.fillStyle = 'black';
    ctx.font = '30px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${this.scoreState.playerScore} / ${this.scoreState.enemyScore}`, -halfWidth / 2, -halfHeight / 2);
    ctx.restore();
  }
}