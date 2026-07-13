export class UserOrderDto {
  id!: string;
  date!: Date;
}

export class GetUserByIdResponseDto {
  id!: string;
  name!: string;
  email!: string;
  address!: string;
  phone!: number;
  country!: string;
  city!: string;
  orders!: UserOrderDto[];
}
