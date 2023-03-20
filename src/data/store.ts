import { configureStore } from "@reduxjs/toolkit";
import chefReduce, { IChefState } from "./chefSlicer";
import dishReduce, { IDishesState } from "./dishSlicer";
import orderReduce, { IOrderState } from "./orderSlicer";
import restaurantsReduce, { IRestaurantsState } from "./resturantSlicer";
export const serverAddress = "http://localhost:8000";
export interface RootState {
  restaurants: IRestaurantsState;
  dishes: IDishesState;
  chefs: IChefState;
  order: IOrderState;
}

export default configureStore({
  reducer: {
    restaurants: restaurantsReduce,
    dishes: dishReduce,
    chefs: chefReduce,
    order: orderReduce,
  },
});
