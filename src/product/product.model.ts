export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
  brand: string;
  safetyInfo: string;
  status: ProductStatus;
}
export enum ProductStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
