import styled from "styled-components";
interface IStyleIcon {
  iconUrl: string;
  width?: number;
  height?: number;
}
interface IFilterButton {
  bold: boolean;
}
interface ICleanButtonWithAnimation {
  isFixed?: boolean;
}
interface IMainButton {
  isActive: boolean;
}
export const MainButton = styled.button<IMainButton>`
  background: ${(props) => (props.isActive ? "black" : "#949494")};
  color: white;
  border: none;
  padding: 14px 36.5px;
  font-weight: 600;
  font-size: 20px;
  letter-spacing: 2.67px;
  text-transform: uppercase;
  &:hover {
    background-color: ${(props) => (props.isActive ? "#515151" : "#949494")};
  }
`;
export const SecondaryButton = styled(MainButton)`
  color: #000000;
  border: 1.5px solid #000000;
  background: ${(props) => (props.isActive ? "transparent" : "#f1f1f1")};
  &:hover {
    background-color: #f1f1f1;
  }
  &:active {
    background-color: black;
    color: white;
  }
`;
export const CleanButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 11px;
`;
export const SwitchButton = styled(CleanButton)<IFilterButton>`
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;
export const CleanButtonWithAnimation = styled(
  CleanButton
)<ICleanButtonWithAnimation>`
  padding-bottom: ${(props) => (props.isFixed ? "5px" : 0)};
  border-bottom: ${(props) =>
    props.isFixed ? "1.8px solid rgba(222, 146, 0, 0.9)" : "none"};
  height: fit-content;
  &:hover {
    padding-bottom: 8px;
    border-bottom: 1.8px solid rgba(222, 146, 0, 0.9);
  }
`;
export const IconButton = styled(CleanButton)<IStyleIcon>`
  width: 24px;
  height: 24px;
  background: url(${(props) => props.iconUrl}) no-repeat;
  background-size: cover;
`;
export const IconDisplay = styled(CleanButton)<IStyleIcon>`
  width: fit-content;
  height: fit-content;
  background: url(${(props) => props.iconUrl}) no-repeat;
  background-size: contain;
`;
export const IPopDiv = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  width: fit-content;
  height: fit-content;
  transform: translate(-50%);
  background: #ffffff;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.25);
`;
