export interface IAccessories{
  name: string;
  type: string;
}

export interface IRent {
  period: string;
  price: string;
}
export interface CarDTO {
  id: string;
  name: string;
  about: string;
  accessories: IAccessories[];
  brand: string;
  fuel_type: string;
  photos: string[];
  rent: IRent;
  thumbnail: string
}
