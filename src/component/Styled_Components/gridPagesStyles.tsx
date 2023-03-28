import styled from "styled-components";
interface IGrid {
  cellSize: number;
}
export const GridCards = styled.div<IGrid>`
  display: grid;
  justify-content: start;
  grid-template-columns: repeat(auto-fill, ${(props) => props.cellSize}px);
  width: calc(100% - 40px);
  justify-content: center;
  row-gap: 40px;
  column-gap: 24px;
`;
export const PageCenterStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 48px;
`;
