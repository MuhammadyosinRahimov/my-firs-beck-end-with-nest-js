export class CreateBoartdto {
  title: string;
  description: string;
  img: string;
  price: [
    {
      size: string;
      quantity: number;
      price: number;
    },
  ];
}
