import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLoggedIn } from "../../../data/orderSlicer";
import { RootState } from "../../../data/store";
import InputFiled from "../../inputFiled/inputFiled";
import {
  CleanButton,
  MainButton,
  SecondaryButton,
} from "../../Styled_Components/Buttons";
import { IUsers } from "../../Types/Interfaces/IUser";
import "./SingInPage.css";
const SingINPage = () => {
  const dispatch = useDispatch();
  const navigation: any = useNavigate();
  const user: IUsers | null = JSON.parse(
    sessionStorage.getItem("user") ?? "null"
  );
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const CanLogIn: boolean = email.length > 5 && password.length > 8;
  const handleLogIn = async (event: React.MouseEvent<HTMLElement>) => {
    try {
      const userReq = await axios.post("http://localhost:8000/users/login", {
        email: email,
        password: password,
      });
      sessionStorage.setItem("user", JSON.stringify(userReq.data));
      navigation("/");
    } catch (error: any) {
      alert(error.response.data);
      return [];
    }
  };

  return (
    <div className="main">
      {user ? (
        <>
          <h1>{"Hi " + user.first_name + " you are already logged in"}</h1>
          <br />
          <br />
          <MainButton
            isActive={true}
            onClick={() => {
              sessionStorage.clear();
              window.location.reload();
            }}
          >
            Log out
          </MainButton>
        </>
      ) : (
        <>
          <div className="singINCard">
            <div className="info">
              <span>SIGN IN</span>
              <p>To continue the order, please sign in</p>
            </div>
            <div className="inputField">
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
            <div className="logInForgetPassword">
              <MainButton
                isActive={CanLogIn}
                className="singUpButtons"
                onClick={handleLogIn}
              >
                login
              </MainButton>
              <CleanButton className="forgetPass">Forget password?</CleanButton>
            </div>
            <div className="orDiv">
              <hr />
              <span>or</span>
              <hr />
            </div>
            <SecondaryButton
              isActive={true}
              onClick={() => {
                navigation("/singUp");
              }}
              className="singUpButtons"
            >
              sign up
            </SecondaryButton>
          </div>
        </>
      )}
    </div>
  );
};
export default SingINPage;
