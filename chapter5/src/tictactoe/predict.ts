import {
  allPlaceable, BoardBit, isWin, Player, Result,
} from './utils';

export type PredictNode = {
  circle: BoardBit;
  cross: BoardBit;
  result: Result;
  next: PredictNode[];
  score: number;
}

export const predict = (
  circle: BoardBit,
  cross: BoardBit,
  nextPlayer: Player,
  depth: number,
): PredictNode => {
  const win = isWin(circle, cross);
  if (win !== 'none') {
    let score = 0;
    switch (win) {
      case 'circle':
        score = 10 - depth;
        break;
      case 'cross':
        score = depth - 10;
        break;
      default:
        score = 0;
        break;
    }
    return {
      circle,
      cross,
      result: win,
      next: [],
      score,
    };
  }
  const current = nextPlayer === 'circle' ? circle : cross;
  const next = allPlaceable(circle + cross, current);
  const nextNodes = next.map((nextNode) => {
    if (nextPlayer === 'circle') return predict(nextNode, cross, 'cross', depth + 1);
    return predict(circle, nextNode, 'circle', depth + 1);
  });
  const score = nextNodes.reduce((acc, val) => {
    if (nextPlayer === 'circle') return Math.max(acc, val.score);
    return Math.min(acc, val.score);
  }, nextPlayer === 'circle' ? -Infinity : Infinity);
  return {
    circle,
    cross,
    result: win,
    next: nextNodes,
    score,
  };
};

export const predictBest = (circle: BoardBit, cross: BoardBit, nextPlayer: Player): PredictNode => {
  const node = predict(circle, cross, nextPlayer, 0);
  const best = node.next.reduce((acc, val) => {
    if (acc.result === nextPlayer) return acc;
    if (nextPlayer === 'circle' && acc.score < val.score) return val;
    if (nextPlayer === 'cross' && acc.score > val.score) return val;
    return acc;
  });
  return best;
};
