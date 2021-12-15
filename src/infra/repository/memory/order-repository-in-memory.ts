import { OrderRepository } from '../../../domain/repository/order-repository';
import { Order } from '../../../domain/entities/order';

export default class OrderRepositoryInMemory implements OrderRepository {
  orders: Order[];

  constructor() {
    this.orders = [];
  }

  save(order: Order): Promise<void> {
    this.orders.push(order);
    return Promise.resolve();
  }

  count(): Promise<number> {
    return Promise.resolve(this.orders.length + 1);
  }
}
