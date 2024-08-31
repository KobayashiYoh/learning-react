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

// 石をひっくり返す関数
export const flipTiles = (
  newBoard: TileStatusType[][],
  row: number,
  col: number,
  player: TileStatusType
): boolean => {
  let flipped = false;

  directions.forEach(([dx, dy]) => {
    let x = row + dx;
    let y = col + dy;
    let hasOpponentBetween = false;

    while (isInBounds(x, y) && isOpponentTile(newBoard, x, y, player)) {
      hasOpponentBetween = true;
      x += dx;
      y += dy;
    }

    if (hasOpponentBetween && isInBounds(x, y) && newBoard[x][y] === player) {
      flipInDirection(newBoard, row, col, dx, dy, player);
      flipped = true;
    }
  });

  return flipped;
};

// ボードの境界内かどうかを判定する関数
const isInBounds = (x: number, y: number): boolean =>
  x >= 0 && x < 8 && y >= 0 && y < 8;

// タイルが相手のものであるかどうかを判定する関数
const isOpponentTile = (
  board: TileStatusType[][],
  x: number,
  y: number,
  player: TileStatusType
): boolean => board[x][y] !== TileStatus.Empty && board[x][y] !== player;

// ひっくり返す処理を行う関数
const flipInDirection = (
  board: TileStatusType[][],
  row: number,
  col: number,
  dx: number,
  dy: number,
  player: TileStatusType
) => {
  let x = row + dx;
  let y = col + dy;
  while (board[x][y] !== player) {
    board[x][y] = player;
    x += dx;
    y += dy;
  }
};

// プレイヤーが置けるかチェックする関数
export const checkPass = (
  board: TileStatusType[][],
  player: TileStatusType
): boolean => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col] === TileStatus.Empty) {
        const tempBoard = board.map((r) => r.slice());
        if (flipTiles(tempBoard, row, col, player)) {
          return false; // 置ける場所があればパスではない
        }
      }
    }
  }
  return true; // 置ける場所がない
};

// 指定したタイプのタイル数をカウントする関数
const countTiles = (
  board: TileStatusType[][],
  tileType: TileStatusType
): number => board.flat().filter((tile) => tile === tileType).length;

// 勝敗を判定する関数
export const showWinner = (board: TileStatusType[][]) => {
  const blackCount = countTiles(board, TileStatus.Black);
  const whiteCount = countTiles(board, TileStatus.White);

  if (blackCount > whiteCount) console.log("黒の勝ち");
  if (whiteCount > blackCount) console.log("白の勝ち");
  if (blackCount === whiteCount) console.log("引き分け");
};
