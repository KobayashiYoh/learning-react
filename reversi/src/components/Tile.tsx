import styled from "styled-components";
import { TileStatus, TileStatusType } from "../constants/gameConstants";

const StyledTile = styled.div<{ status: TileStatusType }>`
  width: 40px;
  height: 40px;
  background-color: ${({ status }) =>
    status === TileStatus.Black
      ? "#000000"
      : status === TileStatus.White
      ? "#FFFFFF"
      : "#2d9959"};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #92bda6;
  }
`;

export const Tile = ({
  status,
  onClick,
}: {
  status: TileStatusType;
  onClick: () => void;
}) => {
  return (
    <StyledTile status={status} onClick={onClick}>
      {status !== TileStatus.Empty ? status.substring(0, 3) : ""}
    </StyledTile>
  );
};
