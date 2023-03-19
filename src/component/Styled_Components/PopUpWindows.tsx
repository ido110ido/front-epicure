import styled from "styled-components";
import { CleanButton } from "./Buttons";
export const BackGroundWindows = styled.div`
  position: fixed;
  z-index: 10001;
  top: 0;
  left: 0;
  width: 100vw;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const DisplayPopUpWindow = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 0px 40px;
  gap: 48px;
  width: 573px;
  height: 85%;
  background: #ffffff;
  overflow-y: scroll;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none;
`;
export const CloseButtonPopUp = styled(CleanButton)`
  position: fixed;
  width: 20px;
  height: 20px;
  top: 3%;
  left: 50%;
  translate: -280px;
  background-image: url("/imges/icons/X.svg");
  background-size: cover;
`;
export const InfoDisplayPopUpWindow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 40px;
  margin: 0px 30%;
`;
