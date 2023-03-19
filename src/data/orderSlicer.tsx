import { createSlice } from "@reduxjs/toolkit";
import { IDishOrder } from "../component/Types/Interfaces/IDishCard";
import { IUsers } from "../component/Types/Interfaces/IUser";

export interface IOrderState {
  user: IUsers | null;
  value: IDishOrder[];
}

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    user: null,
    value: [],
  } as IOrderState,
  reducers: {
    addDishToOrder: (
      state: { value: IDishOrder[] },
      action: { payload: IDishOrder }
    ) => {
      const isSameRestaurant =
        state.value.every(
          (dish) => dish.restaurantId === action.payload.restaurantId
        ) || state.value.length === 0;

      if (isSameRestaurant) {
        state.value = [...state.value, action.payload];
      } else {
        throw new Error("Not the same restaurant");
      }
    },
    cleanOrder: (state: { value: IDishOrder[] }) => {
      state.value = [];
    },
    userLoggedIn: (state, action: { payload: IUsers }) => {
      if (state.user === null) {
        state.user = action.payload;
      }
    },
    userLoggedOut: (state) => {
      state.user = null;
    },
  },
});

export const { addDishToOrder, cleanOrder, userLoggedIn, userLoggedOut } =
  orderSlice.actions;

export default orderSlice.reducer;
