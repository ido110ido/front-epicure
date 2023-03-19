import React from "react";
import { IconButton } from "../../../Styled_Components/Buttons";
import "./Hero.css";
const Hero: React.FC = () => {
  return (
    <div className="hero">
      <div className="centerHeroDiv">
        <h1>Epicure works with the top chef restaurants in Tel Aviv</h1>
        <div className="searchContainer">
          <IconButton iconUrl="/imges/icons/search.svg" />
          <input
            type="text"
            className="heroSerch"
            placeholder="Search for restaurant cuisine, chef"
          />
        </div>
      </div>
    </div>
  );
};
export default Hero;
