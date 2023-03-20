import { createSlice } from "@reduxjs/toolkit";
import { IChef } from "../component/Types/Interfaces/IChef";
const yearInMilliseconds = 31536000000;
export interface IChefState {
  chefsList: IChef[];
  value: IChef[];
  chefName: string;
  singleChef: IChef | null;
}
const getChefsData = async () => {
  return await fetch("https://server-epicure.onrender.com/chefs")
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      console.error("Error getting chefs data:", error);
    });
};
const chefsData: IChef[] = await getChefsData();
const IDchefOfTheWeek = "6408b12b18f482cbda0155d6";
export const chefSlice = createSlice({
  name: "chef",
  initialState: {
    chefsList: chefsData,
    value: [],
    chefName: "",
    singleChef: null,
  } as IChefState,
  reducers: {
    allChefs: (state) => {
      state.value = chefsData;
    },
    popularChefs: (state) => {
      state.value = [...state.chefsList].sort((a, b) => a.visited - b.visited);
    },
    newChefs: (state) => {
      const currentDate = new Date().getTime();
      state.value = state.chefsList.filter((e) => {
        return (
          new Date(e.startDate).getTime() > currentDate - yearInMilliseconds * 5
        );
      });
    },
    getChefName: (state, action) => {
      const temp = state.chefsList.find((e) => e._id === action.payload);
      state.chefName = temp?.firstName + " " + temp?.lastName;
    },
    getChefOfTheWeek: (state) => {
      const chefOfTheWeek = state.chefsList.find(
        (e) => e._id === IDchefOfTheWeek
      );
      if (chefOfTheWeek) {
        state.singleChef = chefOfTheWeek;
      }
    },
    updatedChefs: (state, action) => {
      state.value = action.payload;
      state.chefsList = action.payload;
    },
  },
});

export const {
  allChefs,
  popularChefs,
  newChefs,
  getChefName,
  getChefOfTheWeek,
  updatedChefs,
} = chefSlice.actions;

export default chefSlice.reducer;
