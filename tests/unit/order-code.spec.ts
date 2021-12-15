import OrderCode from '../../src/domain/entities/order-code';

describe('OrderCode', () => {
  it('should create an order code', () => {
    const date = new Date('2021-05-20');
    const sequence = 1;
    const orderCode = new OrderCode(date, sequence);
    expect(orderCode.getCode()).toBe('202100000001');
  });
});
