// gameLogics.ts

import {
  directions,
  TileStatus,
  TileStatusType,
  BOARD_SIZE,
} from "../constants/gameConstants";

export const initialReversiBoard = (): TileStatusType[][] => {
  const initialBoard: TileStatusType[][] = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(TileStatus.Empty));
  const mid = BOARD_SIZE / 2;
  initialBoard[mid - 1][mid - 1] = TileStatus.White;
  initialBoard[mid - 1][mid] = TileStatus.Black;
  initialBoard[mid][mid - 1] = TileStatus.Black;
  initialBoard[mid][mid] = TileStatus.White;
  return initialBoard;
};

const isInBounds = (x: number, y: number): boolean =>
  x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;

const isOpponentPlayerTile = (
  board: TileStatusType[][],
  x: number,
  y: number,
  playerTile: TileStatusType
): boolean => {
  const tile: TileStatusType = board[x][y];
  return tile !== TileStatus.Empty && tile !== playerTile;
};

const findFlippableTilesInSingleDirection = (
  board: TileStatusType[][],
  startX: number,
  startY: number,
  dx: number,
  dy: number,
  playerTile: TileStatusType
): [number, number][] => {
  const flippableTiles: [number, number][] = [];
  let x = startX + dx;
  let y = startY + dy;

  const isContinuation =
    isInBounds(x, y) && isOpponentPlayerTile(board, x, y, playerTile);
  while (isContinuation) {
    flippableTiles.push([x, y]);
    x += dx;
    y += dy;
  }

  const flippable =
    flippableTiles.length > 0 && isInBounds(x, y) && board[x][y] === playerTile;
  if (flippable) {
    return flippableTiles;
  }
  return [];
};

export const findFlippableTilesInAllDirection = (
  board: TileStatusType[][],
  row: number,
  col: number,
  playerTile: TileStatusType
): [number, number][] => {
  const flippableTiles: [number, number][] = [];

  directions.forEach(([dx, dy]) => {
    const tilesToFlip = findFlippableTilesInSingleDirection(
      board,
      row,
      col,
      dx,
      dy,
      playerTile
    );
    flippableTiles.push(...tilesToFlip);
  });

  return flippableTiles;
};

export const isPass = (
  board: TileStatusType[][],
  playerTile: TileStatusType
): boolean => {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === TileStatus.Empty) {
        const flippableTiles = findFlippableTilesInAllDirection(
          board,
          row,
          col,
          playerTile
        );
        if (flippableTiles.length > 0) {
          return false;
        }
      }
    }
  }
  return true;
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
