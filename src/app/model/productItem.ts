export interface Image {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface ProductItem {
  image: Image;
  name: string;
  category: string;
  price: number;
}

export interface productsInCart {
  totalQuantity: number;
  name: string;
  price: number;
  totalPrice: number;
  orderTotal: number;
}