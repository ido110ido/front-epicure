import {
  AnyAction,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IDish } from "../component/Types/Interfaces/IDishCard";
export interface IDishesState {
  dishData: IDish[];
  value: IDish[];
}
const getDishData = async () => {
  return await fetch("https://server-epicure.onrender.com/dishes")
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      console.error("Error getting dishes data:", error);
    });
};
const dishesData: IDish[] = await getDishData();

export const dishSlice = createSlice({
  name: "dishes",
  initialState: {
    dishData: dishesData,
    value: [],
  } as IDishesState,
  reducers: {
    setDishes: (state, action) => {
      const { resturantId, DayPart } = action.payload;
      state.value = state.dishData.filter(
        (dish) => dish.DayPart === DayPart && dish.resturantId === resturantId
      );
    },
    topThreePopularDish: (state) => {
      state.value = state.dishData
        .sort((a, b) => a.visited - b.visited)
        .slice(0, 3);
    },
    updateDish: (state, action) => {
      state.dishData = action.payload;
      state.value = action.payload;
    },
  },
});

export const { setDishes, topThreePopularDish, updateDish } = dishSlice.actions;

export default dishSlice.reducer;
