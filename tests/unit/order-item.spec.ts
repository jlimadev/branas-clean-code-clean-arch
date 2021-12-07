import { OrderItem } from '../../src/domain/entities/order-item';

describe('order-item', () => {
  it('should create an order item', () => {
    const orderItem = new OrderItem(1, 1000, 10);
    expect(orderItem.getTotal()).toBe(10000);
  });
});
