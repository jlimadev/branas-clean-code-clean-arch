import { Order } from '../../src/domain/entities/order';
import { Item } from '../../src/domain/entities/item';
import { Coupon } from '../../src/domain/entities/coupon';

const validCpf = '935.411.347-80';
const makeSimpleOrder = (order: Order): Order => {
  order.addItem(new Item(1, 'Technology', 'Notebook', 5000), 1);
  order.addItem(new Item(2, 'Technology', 'Mouse', 500), 1);
  order.addItem(new Item(3, 'Food', 'Cookies', 2), 5);
  return order;
};

const makeCompleteOrder = (order: Order): Order => {
  order.addItem(new Item(1, 'Technology', 'Notebook', 5000, 100, 50, 50, 20), 1);
  order.addItem(new Item(2, 'Technology', 'Mouse', 1000, 100, 30, 10, 3), 1);
  order.addItem(new Item(3, 'Food', 'Cookies', 30, 10, 10, 10, 0.9), 3);
  return order;
};

describe('order', () => {
  it('should not be able to order with a invalid cpf', () => {
    const invalidCpf = '111.111.111-11';
    const expectedErrorMessage = `CPF ${invalidCpf} is not valid`;
    expect(() => new Order(invalidCpf)).toThrow(new Error(expectedErrorMessage));
  });
  it('should order with a valid cpf', () => {
    const order = new Order(validCpf);
    expect(order).toBeDefined();
  });
  it('should order 3 items', () => {
    const order = new Order(validCpf);
    const simpleOrder = makeSimpleOrder(order);
    const total = simpleOrder.getTotal();
    expect(total).toBe(5510);
  });
  it('should order 3 items with discount coupon', () => {
    const order = new Order(validCpf);
    const simpleOrder = makeSimpleOrder(order);
    simpleOrder.addCoupon(new Coupon('20OFF', 20));
    const total = simpleOrder.getTotal();
    const expectedTotal = 4408;
    expect(total).toBe(expectedTotal);
  });
  it('should order with expired discount coupon but not apply discount', () => {
    const order = new Order(validCpf);
    order.addItem(new Item(1, 'Technology', 'Notebook', 5000), 1);
    order.addCoupon(new Coupon('20OFF', 20, new Date(2020, 1, 1)));
    const total = order.getTotal();
    expect(total).toBe(5000);
  });
  it('should order 3 items with default freight calculator strategy', () => {
    const order = new Order(validCpf);
    const completeOrder = makeCompleteOrder(order);
    const freight = completeOrder.getFreight();
    expect(freight).toBe(260);
  });
  it('should order with code', () => {
    const order = new Order(validCpf, new Date('2021-01-01T12:00:00'));
    const completeOrder = makeCompleteOrder(order);
    const id = completeOrder.getId();
    expect(id).toBe('202100000001');
  });
});
