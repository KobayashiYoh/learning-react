import styled from "styled-components";

export const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr); /* ボードを8x8に変更 */
  grid-template-rows: repeat(8, 1fr);
  gap: 2px;
  width: 320px; /* サイズを調整 */
  height: 320px;
  background: #333333;
  padding: 2px;
`;
