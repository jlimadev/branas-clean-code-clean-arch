import { Order } from './order';
import { Item } from './item';
import { Coupon } from './coupon';

describe('order', () => {
  it('should not be able to order with a invalid cpf', () => {
    const cpf = '111.111.111-11';
    expect(() => new Order(cpf)).toThrow(new Error(`CPF ${cpf} is not valid`));
  });
  it('should order with a valid cpf', () => {
    const cpf = '935.411.347-80';
    const order = new Order(cpf);
    expect(order).toBeDefined();
  });
  it('should order 3 items', () => {
    const cpf = '935.411.347-80';
    const order = new Order(cpf);
    order.addItem(new Item(1, 'Technology', 'Notebook', 5000), 1);
    order.addItem(new Item(2, 'Technology', 'Mouse', 500), 1);
    order.addItem(new Item(3, 'Food', 'Cookies', 2), 5);
    const total = order.getTotal();
    expect(total).toBe(5510);
  });
  it('should order 3 items with discount coupon', () => {
    const cpf = '935.411.347-80';
    const order = new Order(cpf);
    order.addItem(new Item(1, 'Technology', 'Notebook', 5000), 1);
    order.addItem(new Item(2, 'Technology', 'Mouse', 500), 1);
    order.addItem(new Item(3, 'Food', 'Cookies', 2), 5);
    order.addCoupon(new Coupon('20OFF', 20));
    const total = order.getTotal();
    const expectedTotal = 4408;
    expect(total).toBe(expectedTotal);
  });
});
