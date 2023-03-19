import React, { useEffect } from "react";
import ChefCard from "../../../Cards/ChefCard/ChefCard";
import "./ChefOfTheWeek.css";
import data from "../../../../data/resturants.json";
import CardResturant from "../../../Cards/CardResturant/CardResturant";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../data/store";
import { useDispatch, useSelector } from "react-redux";
import { getChefOfTheWeek } from "../../../../data/chefSlicer";
import { chefRestaurant } from "../../../../data/resturantSlicer";
const ChefOfTheWeek: React.FC = () => {
  const navigation: any = useNavigate();
  const dispatch = useDispatch();
  const chef = useSelector((state: RootState) => state.chefs.singleChef);
  const chefRestaurants = useSelector(
    (state: RootState) => state.restaurants.chefRestaurants
  );
  useEffect(() => {
    dispatch(getChefOfTheWeek());
    dispatch(chefRestaurant(chef?._id));
  }, []);
  return (
    <div className="ChefOfTheWeek">
      <h2 className="titleCompo">Chef of the week:</h2>
      <div className="chefAndAboutMe">
        {chef && (
          <>
            <ChefCard chefData={chef} />
          </>
        )}

        <p className="aboutMe">{chef?.about}</p>
      </div>
      <h2>{chef?.firstName + "'s Restaurants"}</h2>
      <div className="resturantRow">
        {chefRestaurants.map((resturant, index: number) => (
          <CardResturant
            key={index}
            resturantData={resturant}
            chef={resturant.name}
            isChafOfTheWeek={true}
            onClick={() => {
              navigation(`resturants/${resturant._id}`);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ChefOfTheWeek;
