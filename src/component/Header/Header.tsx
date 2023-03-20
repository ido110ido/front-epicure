import React, { useRef, useState } from "react";
import { NavLink, useNavigate, useNavigation } from "react-router-dom";
import BagPopUp from "../PopUps/BagPopUp/BagPopUp";
import {
  CleanButtonWithAnimation,
  IconButton,
} from "../Styled_Components/Buttons";
import { IUsers } from "../Types/Interfaces/IUser";
import "./Header.css";
const Header: React.FC = () => {
  const navigation: any = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user") ?? "null");
  const [openBag, setOpenBag] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const modalRef = useRef<HTMLButtonElement>(null);
  return (
    <header>
      <div className="headerFrame">
        <nav className="logoAndNav">
          <div
            className="logoDiv"
            onClick={() => {
              navigation("/");
            }}
          >
            <img src="/imges/icons/logo.svg" alt="logo" />
            <p>EPICURE</p>
          </div>
          <NavLink
            to="/resturants"
            className={({ isActive }) => (isActive ? "undeline" : "notActive")}
          >
            Restaurants
          </NavLink>
          <NavLink
            to="/chefs"
            className={({ isActive }) => (isActive ? "undeline" : "notActive")}
          >
            Chefs
          </NavLink>
        </nav>
        <nav className="dropDown">
          <IconButton
            iconUrl="/imges/hamburger.svg"
            onClick={() => setOpenMenu(!openMenu)}
          />
          {openMenu && (
            <div className="dropDownDIv">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "undeline" : "notActive"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/resturants"
                className={({ isActive }) =>
                  isActive ? "undeline" : "notActive"
                }
              >
                Restaurants
              </NavLink>
              <NavLink
                to="/chefs"
                className={({ isActive }) =>
                  isActive ? "undeline" : "notActive"
                }
              >
                Chefs
              </NavLink>
            </div>
          )}
        </nav>
        {user && <h2>{"Hello, " + user.first_name}</h2>}
        <nav className="menu-right">
          <input type="text" />
          <IconButton
            onClick={() => setOpenBag(!openBag)}
            iconUrl="/imges/icons/bag.svg"
          />
          <IconButton
            ref={modalRef}
            key="bag"
            onClick={() => {
              navigation("/singIn");
            }}
            iconUrl="/imges/icons/person.svg"
          />
        </nav>
      </div>
      {openBag && (
        <BagPopUp
          closingFunc={() => {
            setOpenBag(false);
          }}
          ButtonRef={modalRef}
        />
      )}
    </header>
  );
};
export default Header;
