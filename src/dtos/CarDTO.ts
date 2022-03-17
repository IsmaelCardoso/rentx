export interface IAccessories {
  name: string;
  type: string;
}

export interface IPhotos {
  id: string;
  photo: string;
}
export interface CarDTO {
  id: string;
  name: string;
  about: string;
  accessories: IAccessories[];
  brand: string;
  fuel_type: string;
  photos: IPhotos[];
  period: string;
  price: string;
  thumbnail: string;
}
