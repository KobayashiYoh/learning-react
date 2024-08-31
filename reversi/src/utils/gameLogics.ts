// gameLogics.ts

import {
  directions,
  TileStatus,
  TileStatusType,
} from "../constants/gameConstants";

export const initialReversiBoard = (): TileStatusType[][] => {
  const initialBoard: TileStatusType[][] = Array(8)
    .fill(null)
    .map(() => Array(8).fill(TileStatus.Empty));
  initialBoard[3][3] = TileStatus.White;
  initialBoard[3][4] = TileStatus.Black;
  initialBoard[4][3] = TileStatus.Black;
  initialBoard[4][4] = TileStatus.White;
  return initialBoard;
};

const isInBounds = (x: number, y: number): boolean =>
  x >= 0 && x < 8 && y >= 0 && y < 8;

const isOpponentTile = (
  board: TileStatusType[][],
  x: number,
  y: number,
  player: TileStatusType
): boolean => board[x][y] !== TileStatus.Empty && board[x][y] !== player;

export const findFlippableTiles = (
  board: TileStatusType[][],
  row: number,
  col: number,
  player: TileStatusType
): [number, number][] => {
  const flippableTiles: [number, number][] = [];

  directions.forEach(([dx, dy]) => {
    let x = row + dx;
    let y = col + dy;
    const tilesToFlip: [number, number][] = [];

    while (isInBounds(x, y) && isOpponentTile(board, x, y, player)) {
      tilesToFlip.push([x, y]);
      x += dx;
      y += dy;
    }

    if (tilesToFlip.length > 0 && isInBounds(x, y) && board[x][y] === player) {
      flippableTiles.push(...tilesToFlip);
    }
  });

  return flippableTiles;
};

export const checkPass = (
  board: TileStatusType[][],
  player: TileStatusType
): boolean => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col] === TileStatus.Empty) {
        const flippableTiles = findFlippableTiles(board, row, col, player);
        if (flippableTiles.length > 0) {
          return false; // 置ける場所があればパスではない
        }
      }
    }
  }
  return true; // 置ける場所がない
};

const countTiles = (
  board: TileStatusType[][],
  tileType: TileStatusType
): number => board.flat().filter((tile) => tile === tileType).length;

export const showWinner = (board: TileStatusType[][]) => {
  const blackCount = countTiles(board, TileStatus.Black);
  const whiteCount = countTiles(board, TileStatus.White);

  if (blackCount > whiteCount) console.log("黒の勝ち");
  if (whiteCount > blackCount) console.log("白の勝ち");
  if (blackCount === whiteCount) console.log("引き分け");
};
