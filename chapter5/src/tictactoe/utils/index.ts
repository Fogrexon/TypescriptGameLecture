/* eslint-disable no-bitwise */
export type BoardBit = number;
export type Result = 'circle' | 'cross' | 'draw' | 'none';
export type Player = 'circle' | 'cross';

export const toBitFromList = (arr: boolean[]): BoardBit => arr.reduce((acc, val, i) => {
  if (val) {
    return acc + 2 ** i;
  }
  return acc;
}, 0);

const WIN_BOARD = [
  toBitFromList([true, true, true, false, false, false, false, false, false]),
  toBitFromList([false, false, false, true, true, true, false, false, false]),
  toBitFromList([false, false, false, false, false, false, true, true, true]),
  toBitFromList([true, false, false, true, false, false, true, false, false]),
  toBitFromList([false, true, false, false, true, false, false, true, false]),
  toBitFromList([false, false, true, false, false, true, false, false, true]),
  toBitFromList([true, false, false, false, true, false, false, false, true]),
  toBitFromList([false, false, true, false, true, false, true, false, false]),
];
export const judgeResult = (circle: BoardBit, cross: BoardBit): Result => {
  if (circle + cross === 0b111111111) return 'draw';
  for (let i = 0; i < WIN_BOARD.length; i += 1) {
    if ((circle & WIN_BOARD[i]) === WIN_BOARD[i]) return 'circle';
    if ((cross & WIN_BOARD[i]) === WIN_BOARD[i]) return 'cross';
  }
  return 'none';
};

export const allPlaceable = (board: BoardBit, current: BoardBit) => {
  const placeable = [];
  for (let i = 0; i < 9; i += 1) {
    if ((board & (2 ** i)) === 0) {
      placeable.push(current + 2 ** i);
    }
  }
  return placeable;
};

export const toCoordinate = (placed: BoardBit) => {
  const num = Math.log2(placed);
  return { x: (num % 3) - 1, y: Math.floor(num / 3) - 1 };
};

export const toBit = (x: number, y: number) => 2 ** (x + 1 + (y + 1) * 3);
