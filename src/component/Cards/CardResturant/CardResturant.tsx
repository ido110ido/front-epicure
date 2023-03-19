import React from "react";
import { IRestaurantCard } from "../../Types/Interfaces/IRestaurantCard";
import "./CardResturant.css";
const CardResturant: React.FC<IRestaurantCard> = (props: IRestaurantCard) => {
  let rating = Math.round(props.resturantData.rating);
  if (rating < 1) rating = 1;
  else if (rating > 5) rating = 5;
  return (
    <div
      onClick={props.onClick}
      className={
        props.isChafOfTheWeek
          ? "cardResturant cardResturantSimplify"
          : "cardResturant"
      }
    >
      <img
        className={
          props.isChafOfTheWeek
            ? "resturantImg resturantImgSimplify"
            : "resturantImg"
        }
        src={props.resturantData.img}
        alt={props.resturantData.name}
      />
      <h3>{props.resturantData.name}</h3>
      {!props.isChafOfTheWeek && (
        <>
          <span>{props.chef}</span>
          <img
            src={"/imges/starRating/rate-" + rating + ".svg"}
            alt={"rating" + rating}
            className="rating"
          />
        </>
      )}
    </div>
  );
};

export default CardResturant;
