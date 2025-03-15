export interface Board {
  id: string;
  title: string;
  img: string;
  description: string;
  status: BoardStatus;
  price: [
    {
      size: string;
      quantity: number;
      price: number;
    },
  ];
}
export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
