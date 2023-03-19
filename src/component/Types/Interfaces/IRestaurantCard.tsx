export interface IRestaurantCard {
  resturantData: IRestaurant;
  isChafOfTheWeek?: boolean;
  onClick: () => void;
  chef: string;
}

export interface IRestaurant {
  _id: string;
  chefId: string;
  name: string;
  visited: number;
  img: string;
  startDate: string;
  about: string;
  openHour: number;
  closeHour: number;
  latitude: number;
  longitude: number;
  rating: number;
}
