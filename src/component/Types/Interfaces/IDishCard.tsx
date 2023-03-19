import { DayPart } from "../enums/DishEnums";

export interface IDishCard {
  dishData: IDish;
  isSmall?: boolean;
  restaurantName?: string;
}
export interface IDish {
  _id: string;
  resturantId: string;
  name: string;
  visited: number;
  img: string;
  price: number;
  ingredients: string[];
  foodType: string[];
  DayPart: DayPart;
  changes: { changeName: string; price: number }[];
  sides: string[];
}

export interface IDishOrder {
  name: string;
  _id: string;
  restaurantId: string;
  img: string;
  price: number;
  amount: number;
  extraInfo: string[];
}
