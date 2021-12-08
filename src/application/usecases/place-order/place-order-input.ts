type OrderItem = {
  idItem: number;
  quantity: number;
};

export default class PlaceOrderInput {
  constructor(
    readonly cpf: string,
    readonly orderItems: OrderItem[],
    readonly date: Date,
    readonly coupon?: string,
  ) {}
}
