import React from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import "./IconsBooks.css";
const IconBooks: React.FC = () => {
  const navigation: any = useNavigate();
  return (
    <div className="IconBooks">
      <h2>THE MEANING OF OUR ICONS:</h2>
      <div className="container">
        <div className="iconAndTitle">
          <img src="imges/icons/foodTypes/spicy.svg" alt="spicy" />
          <span>spicy</span>
        </div>
        <div className="iconAndTitle">
          <img src="imges/icons/foodTypes/vegitarian.svg" alt="vegitarian" />
          <span>vegitarian</span>
        </div>
        <div className="iconAndTitle">
          <img src="imges/icons/foodTypes/vegan.svg" alt="vegan" />
          <span>vegan</span>
        </div>
      </div>
    </div>
  );
};
export default IconBooks;
