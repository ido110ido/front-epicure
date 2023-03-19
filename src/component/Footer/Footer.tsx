import React from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import {
  CleanButton,
  CleanButtonWithAnimation,
} from "../Styled_Components/Buttons";
import "./Footer.css";
const Footer: React.FC = () => {
  const navigation: any = useNavigate();
  return (
    <footer>
      <CleanButtonWithAnimation>Contact Us</CleanButtonWithAnimation>
      <CleanButtonWithAnimation>Term of Use</CleanButtonWithAnimation>
      <CleanButtonWithAnimation>Privacy Policy</CleanButtonWithAnimation>
    </footer>
  );
};
export default Footer;
