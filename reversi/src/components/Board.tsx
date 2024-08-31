import { useGameBoard } from "../hooks/useGameBoard";
import { BoardContainer } from "./BoardContainer";
import { Tile } from "./Tile";

export const Board = () => {
  const { board, handleTileClick } = useGameBoard();
  return (
    <BoardContainer>
      {board.map((row, rowIndex) =>
        row.map((status, colIndex) => (
          <Tile
            key={`${rowIndex}-${colIndex}`}
            status={status}
            onClick={() => handleTileClick(rowIndex, colIndex)}
          />
        ))
      )}
    </BoardContainer>
  );
};
