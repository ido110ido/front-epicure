import styled from "styled-components";

export const FilterButtonLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 1.5em;
  gap: 40px;
  width: 100%;
  margin-bottom: 40px;
  font-size: 18px;
`;

export const FilterRengeLine = styled(FilterButtonLine)`
  gap: 47.5px;
  height: 60px;
  background-color: #fafafa;
`;
