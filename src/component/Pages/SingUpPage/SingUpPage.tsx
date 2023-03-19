import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLoggedIn } from "../../../data/orderSlicer";
import { RootState } from "../../../data/store";
import InputFiled from "../../inputFiled/inputFiled";
import { SecondaryButton } from "../../Styled_Components/Buttons";
import "../SingInPage/SingInPage.css";
const SingUpPage = () => {
  const dispatch = useDispatch();
  const navigation: any = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const handleRegister = async (event: React.MouseEvent<HTMLElement>) => {
    try {
      const userReq = await axios.post(
        "https://server-epicure.onrender.com/users/signup",
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        }
      );
      sessionStorage.setItem("user", JSON.stringify(userReq.data));
      navigation("/");
    } catch (error: any) {
      alert(error.response.data);
      return [];
    }
  };
  return (
    <div className="main">
      <div className="singINCard">
        <div className="info">
          <span>SING UP</span>
        </div>
        <div className="inputField">
          <InputFiled
            label={"first name"}
            onChange={(value) => setFirstName(value)}
          />
          <InputFiled
            label={"last name"}
            onChange={(value) => setLastName(value)}
          />
          <InputFiled
            label={"Email address"}
            onChange={(value) => setEmail(value)}
          />
          <InputFiled
            type="password"
            label={"Password"}
            onChange={(value) => setPassword(value)}
          />
        </div>
        <SecondaryButton
          isActive={true}
          className="singUpButtons"
          onClick={handleRegister}
        >
          sign up
        </SecondaryButton>
      </div>
    </div>
  );
};
export default SingUpPage;
