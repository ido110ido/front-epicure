import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hero from "./Hero/Hero";
import CardsContiner from "./CardContiner/CardContiner";
import IconBooks from "./IconsBooks/IconsBooks";
import CardResturant from "../../Cards/CardResturant/CardResturant";
import CardDish from "../../Cards/CardDish/CardDish";
import ChefOfTheWeek from "./ChafOfTheWeek/ChafOfTheWeek";
import About from "./About/About";
import { RootState } from "../../../data/store";
import { topThreePopularRestaurants } from "../../../data/resturantSlicer";
import { useNavigate } from "react-router-dom";
import { IRestaurant } from "../../Types/Interfaces/IRestaurantCard";
import { topThreePopularDish } from "../../../data/dishSlicer";
import { IDish } from "../../Types/Interfaces/IDishCard";
import { allChefs, getChefName } from "../../../data/chefSlicer";
const HomePage = () => {
  const navigation: any = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(topThreePopularRestaurants());
    dispatch(topThreePopularDish());
    dispatch(allChefs());
  }, []);
  const restaurants = useSelector(
    (state: RootState) => state.restaurants.value
  );
  const dishes = useSelector((state: RootState) => state.dishes.value);
  const chefs = useSelector((state: RootState) => state.chefs.value);
  return (
    <div>
      <Hero />
      <CardsContiner
        title={"popular restaurant in epicure:"}
        cards={
          <>
            {restaurants.map((restaurant: IRestaurant, index: number) => {
              const chef = chefs.find((e) => e._id === restaurant.chefId);
              return (
                <CardResturant
                  key={index}
                  resturantData={restaurant}
                  chef={chef?.firstName + " " + chef?.lastName}
                  onClick={() => {
                    navigation(`resturants/${restaurant._id}`);
                  }}
                />
              );
            })}
          </>
        }
        isToAllButton={true}
        buttonText="All restaurants"
        buttonFunc={() => {
          navigation("/resturants");
        }}
      />
      <CardsContiner
        title={"SIGNATURE DISH OF:"}
        cards={
          <>
            {dishes.map((dish: IDish, index: number) => {
              return <CardDish dishData={dish} key={index} />;
            })}
          </>
        }
      />
      <IconBooks />
      <ChefOfTheWeek />
      <About />
    </div>
  );
};
export default HomePage;
