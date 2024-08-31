// useGameBoard.ts

import { useEffect, useState } from "react";
import {
  initialReversiBoard,
  showWinner,
  findFlippableTiles,
  isPass,
} from "../utils/gameLogics";
import { TileStatus, TileStatusType } from "../constants/gameConstants";

export const useGameBoard = () => {
  const [board, setBoard] = useState<TileStatusType[][]>(initialReversiBoard);
  const [isBlackTurn, setBlackTurn] = useState(true);
  const [isGameOver, setGameOver] = useState(false);

  const currentTurnTile: TileStatusType = isBlackTurn
    ? TileStatus.Black
    : TileStatus.White;
  const nextTurnTile: TileStatusType = !isBlackTurn
    ? TileStatus.Black
    : TileStatus.White;

  const handleTileClick = (row: number, col: number) => {
    if (isGameOver) return;

    const selectedTile: TileStatusType = board[row][col];
    if (selectedTile !== TileStatus.Empty) return;

    const flippableTiles = findFlippableTiles(board, row, col, currentTurnTile);
    if (flippableTiles.length === 0) return;

    const newBoard: TileStatusType[][] = board.map((r) => r.slice());
    newBoard[row][col] = currentTurnTile;
    flippableTiles.forEach(([x, y]) => {
      newBoard[x][y] = currentTurnTile;
    });
    setBoard(newBoard);

    const nextPlayerMustPass = isPass(newBoard, nextTurnTile);
    const currentPlayerMustPass = isPass(newBoard, currentTurnTile);
    const bothPlayersMustPass = nextPlayerMustPass && currentPlayerMustPass;
    if (bothPlayersMustPass) {
      setGameOver(true);
    } else if (nextPlayerMustPass) {
      setBlackTurn(isBlackTurn); // 自分のターンを継続
    } else {
      setBlackTurn(!isBlackTurn); // プレイヤー交代
    }
  };

  useEffect(() => {
    if (isGameOver) showWinner(board);
  }, [isGameOver, board]);

  return { board, handleTileClick };
};
