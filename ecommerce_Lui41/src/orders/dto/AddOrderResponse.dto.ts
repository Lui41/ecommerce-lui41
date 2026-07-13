export class AddOrderResponseDto {
  id!: string;

  date!: Date;

  user!: {
    id: string;
    name: string;
  };

  orderDetail!: {
    id: string;
    price: number;
  };
}
