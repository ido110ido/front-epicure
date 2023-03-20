import { createSlice } from "@reduxjs/toolkit";
import { IRestaurant } from "../component/Types/Interfaces/IRestaurantCard";
import data from "./resturants.json";
const yearInMilliseconds = 31536000000;
export interface IRestaurantsState {
  restaurantsData: IRestaurant[];
  value: IRestaurant[];
  chefRestaurants: IRestaurant[];
}

const getRestaurantData = async () => {
  return await fetch("http://localhost:8000/restaurants")
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      console.error("Error getting Restaurant data:", error);
    });
};
export const restaurantsData: IRestaurant[] = await getRestaurantData();

export const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState: {
    restaurantsData: restaurantsData,
    value: [],
    chefRestaurants: [],
  } as IRestaurantsState,
  reducers: {
    all: (state) => {
      state.value = state.restaurantsData;
    },
    updatedRestaurant: (state, action) => {
      state.value = action.payload;
      state.restaurantsData = action.payload;
    },
    newRestaurants: (state) => {
      const currentDate = new Date().getTime();
      state.value = state.restaurantsData.filter((e) => {
        return (
          new Date(e.startDate).getTime() > currentDate - yearInMilliseconds * 2
        );
      });
    },
    openRestaurants: (state) => {
      const currentHour = new Date().getHours();
      state.value = state.restaurantsData.filter((e) => {
        return e.openHour <= currentHour && currentHour < e.closeHour;
      });
    },
    popularRestaurants: (state) => {
      state.value = [...state.restaurantsData]
        .sort((a, b) => a.visited - b.visited)
        .slice(0, 10);
    },
    topThreePopularRestaurants: (state) => {
      state.value = [...state.restaurantsData]
        .sort((a, b) => a.visited - b.visited)
        .slice(0, 3);
    },
    filterByRating: (state, action) => {
      state.value = state.restaurantsData.filter((e) =>
        action.payload.includes(e.rating)
      );
    },
    profileRestaurant: (state, action) => {
      state.value = state.restaurantsData.filter(
        (e) => e._id === action.payload
      );
    },
    chefRestaurant: (state, action) => {
      state.chefRestaurants = state.restaurantsData.filter(
        (e) => e.chefId === action.payload
      );
    },
  },
});

export const {
  all,
  newRestaurants,
  updatedRestaurant,
  openRestaurants,
  popularRestaurants,
  filterByRating,
  topThreePopularRestaurants,
  profileRestaurant,
  chefRestaurant,
} = restaurantsSlice.actions;

export default restaurantsSlice.reducer;
