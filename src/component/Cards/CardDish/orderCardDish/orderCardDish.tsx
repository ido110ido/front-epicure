import React, { ChangeEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { IDishOrder } from "../../../Types/Interfaces/IDishCard";
import "./orderCardDish.css";
interface IOrderCardDish {
  value: IDishOrder;
}
const OrderCardDish: React.FC<IOrderCardDish> = (props) => {
  const dish: IDishOrder = props.value;
  return (
    <div className="orderCardDish">
      <img src="/imges/clarodesktop.png" alt="img" />
      <div className="mainCardPart">
        <div>
          <div className="amount">{dish.amount}</div>
          <div className="nameAndPrice">
            <span className="dishName">{dish.name}</span>
            <span className="dishPrice">₪{dish.price}</span>
          </div>
        </div>
        <div className="dishOption">{dish.extraInfo.join(" | ")}</div>
        <span className="bigDishPrice">₪{dish.price}</span>
      </div>
    </div>
  );
};
export default OrderCardDish;
