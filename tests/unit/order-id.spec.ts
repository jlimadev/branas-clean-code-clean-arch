import OrderId from '../../src/domain/entities/order-id';

describe('OrderId', () => {
  it('should create an order id', () => {
    const date = new Date('2021-05-20');
    const sequence = 1;
    const orderCode = new OrderId(date, sequence);
    expect(orderCode.getId()).toBe('202100000001');
  });
});
