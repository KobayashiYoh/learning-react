import "./App.css";

export const TileStatus = {
  Wall: "Wall",
  Empty: "Empty",
  Black: "Black",
  White: "White",
} as const;

import styled from "styled-components";

const StyledTile = styled.div`
  background: #2d9959;
  cursor: pointer;

  &:hover {
    background-color: #92bda6;
  }
`;

export const Tile = ({ status }: { status: keyof typeof TileStatus }) => {
  return <StyledTile>{status.substring(0, 3)}</StyledTile>;
};

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: repeat(15, 1fr);
  gap: 2px;
  width: 640px;
  height: 640px;
  background: #333333;
  padding: 2px;
`;

export const Board = () => {
  const tiles = [];

  for (let row = 0; row < 15; row++) {
    for (let col = 0; col < 15; col++) {
      const key = `${row}-${col}`;
      tiles.push(<Tile key={key} status={TileStatus.Wall} />);
    }
  }

  return <BoardContainer>{tiles}</BoardContainer>;
};

const PageBody = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const GamePage = () => {
  return (
    <PageBody>
      <Board />
    </PageBody>
  );
};

function App() {
  return <GamePage />;
}

export default App;
