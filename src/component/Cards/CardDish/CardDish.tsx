import React, { ChangeEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import PopUpDish from "../../PopUps/popUpDish/popUpDish";
import { IDish, IDishCard } from "../../Types/Interfaces/IDishCard";
import "./CardDish.css";
const CardDish: React.FC<IDishCard> = (props) => {
  //data
  const dishData: IDish = props.dishData;
  // if cardDish is small some style changes happened
  const fontName: number = props.isSmall ? 24 : 30;
  const paddingIngredient: number = props.isSmall ? 25 : 32;
  //handle closing and opening popup
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: React.MouseEvent) => {
    modalRef.current === event.target && handleClose();
  };
  //create food type image arry to present
  const foodTypeIcons = dishData.foodType.map((food: string, index: number) => (
    <img
      key={index}
      className="foodTypeLogo"
      src={"/imges/icons/foodTypes/" + food + ".svg"}
      alt={food}
    />
  ));
  return (
    <>
      <div
        className={props.isSmall ? "cardDish small" : "cardDish"}
        onClick={handleOpen}
      >
        <img className="dishImg" src={dishData.img} alt={dishData.name} />
        <h3 className="title" style={{ fontSize: fontName }}>
          {dishData.name}
        </h3>
        {!props.isSmall && <div className="foodTypes">{foodTypeIcons}</div>}
        <p
          className="ingredients"
          style={{
            paddingLeft: paddingIngredient,
            paddingRight: paddingIngredient,
          }}
        >
          {dishData.ingredients.join(",")}
        </p>
        <div className="price">
          <hr />
          <span>₪{dishData.price}</span>
          <hr />
        </div>
      </div>
      {props.isSmall && isOpen && (
        <PopUpDish
          restaurantName={props.restaurantName || ""}
          onClick={handleClickOutside}
          forwardRef={modalRef}
          dish={dishData}
          onSubmit={() => {
            handleClose();
          }}
        />
      )}
    </>
  );
};
export default CardDish;
