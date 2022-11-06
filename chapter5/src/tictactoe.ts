/* eslint-disable no-bitwise */
import { predictBest } from './tictactoe/predict';
import {
  isWin as judgeResult, Result, toBit, toCoordinate,
} from './tictactoe/utils';

export class TicTacToe {
  private circleBit: number = 0;

  private crossBit: number = 0;

  private result: Result = 'none';

  public tryPlaceCircle(x: number, y: number) {
    if (this.result !== 'none') return false;
    const bit = toBit(x, y);
    if ((this.circleBit & bit) !== 0 || (this.crossBit & bit) !== 0) return false;

    this.circleBit += toBit(x, y);
    const result = judgeResult(this.circleBit, this.crossBit);
    this.result = result;
    return true;
  }

  public placeNextCross() {
    const predTree = predictBest(this.circleBit, this.crossBit, 'cross');

    // eslint-disable-next-line no-bitwise
    const nextPlace = toCoordinate(this.crossBit ^ predTree.cross);
    this.crossBit = predTree.cross;

    this.result = predTree.result;
    return nextPlace;
  }

  public getResult() {
    return this.result;
  }
}
