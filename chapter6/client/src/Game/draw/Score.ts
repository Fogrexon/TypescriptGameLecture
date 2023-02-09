import { GameInfo } from "../../Network/State";
import { IDrawable } from "./Drawer";

export class Score implements IDrawable {
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