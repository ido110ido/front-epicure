import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { getChefName } from "../../../data/chefSlicer";
import { setDishes } from "../../../data/dishSlicer";
import {
  all,
  profileRestaurant,
  updatedRestaurant,
} from "../../../data/resturantSlicer";
import { RootState } from "../../../data/store";
import CardDish from "../../Cards/CardDish/CardDish";
import {
  CleanButton,
  CleanButtonWithAnimation,
  IconButton,
} from "../../Styled_Components/Buttons";
import { FilterButtonLine } from "../../Styled_Components/filterButtonLine";
import { GridCards } from "../../Styled_Components/gridPagesStyles";
import { DayPart } from "../../Types/enums/DishEnums";
import { IDish } from "../../Types/Interfaces/IDishCard";
import "./RestaurantProfilePages.css";
const RestaurantProfilePages = () => {
  const navigation: any = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const restaurantProfile = useSelector(
    (state: RootState) => state.restaurants.value
  );
  const dishes = useSelector((state: RootState) => state.dishes.value);
  const chef = useSelector((state: RootState) => state.chefs.chefName);
  const [currentTab, setCurrentTab] = useState<string>("Breakfast");
  const checkIfOpen = (): boolean => {
    const currentHour = new Date().getHours();
    return (
      restaurantProfile[0].openHour <= currentHour &&
      currentHour < restaurantProfile[0].closeHour
    );
  };
  const delateRestaurant = async () => {
    if (id) {
      try {
        const restaurantsAfterDelete = await axios.delete(
          "https://server-epicure.onrender.com/restaurants",
          {
            data: {
              id: id,
            },
          }
        );

        dispatch(updatedRestaurant(restaurantsAfterDelete.data.data));
        navigation(-1);
        console.log("aaa");
        console.log(restaurantsAfterDelete.data.data);
      } catch (error: any) {
        alert(error.response.data);
        return [];
      }
    }
  };
  useEffect(() => {
    dispatch(profileRestaurant(id));
    dispatch(getChefName(id));
    dispatch(setDishes({ resturantId: id, DayPart: DayPart.Breakfast }));
  }, []);
  return (
    <div className="RestaurantProfilePages">
      <img
        className="restaurantPic"
        src={restaurantProfile[0].img}
        alt="restaurant image"
      />
      <CleanButton className="removeButton" onClick={delateRestaurant}>
        X
      </CleanButton>
      <h3>{restaurantProfile[0].name}</h3>
      <span>{chef}</span>
      <div className="restaurantOpenStatus">
        {checkIfOpen() ? (
          <>
            <img src="\imges\icons\clock-icon.svg" alt="clock" />
            <span>Open now</span>
          </>
        ) : (
          <>
            <span>Open between</span>
            <span>
              {restaurantProfile[0].openHour}:00 -
              {restaurantProfile[0].closeHour}:00
            </span>
          </>
        )}
      </div>
      <FilterButtonLine style={{ fontSize: "24px" }}>
        <CleanButtonWithAnimation
          isFixed={"Breakfast" === currentTab}
          onClick={(value) => {
            setCurrentTab(value.currentTarget.innerText);
            dispatch(
              setDishes({ resturantId: id, DayPart: DayPart.Breakfast })
            );
          }}
        >
          Breakfast
        </CleanButtonWithAnimation>
        <CleanButtonWithAnimation
          isFixed={"Launch" === currentTab}
          onClick={(value) => {
            setCurrentTab(value.currentTarget.innerText);
            dispatch(setDishes({ resturantId: id, DayPart: DayPart.Launch }));
          }}
        >
          Launch
        </CleanButtonWithAnimation>
        <CleanButtonWithAnimation
          isFixed={"Dinner" === currentTab}
          onClick={(value) => {
            setCurrentTab(value.currentTarget.innerText);
            dispatch(setDishes({ resturantId: id, DayPart: DayPart.Dinner }));
          }}
        >
          Dinner
        </CleanButtonWithAnimation>
      </FilterButtonLine>
      <GridCards cellSize={272}>
        {dishes.map((dish: IDish, index: number) => {
          return (
            <CardDish
              dishData={dish}
              key={index}
              isSmall={true}
              restaurantName={restaurantProfile[0].name}
            />
          );
        })}
      </GridCards>
    </div>
  );
};
export default RestaurantProfilePages;
