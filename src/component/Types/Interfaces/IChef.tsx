export interface IChef {
  _id: string;
  img: string;
  firstName: string;
  lastName: string;
  visited: number;
  startDate: string;
  about: string;
}
export interface IChefCard {
  Removable?: boolean;
  chefData: IChef;
}
