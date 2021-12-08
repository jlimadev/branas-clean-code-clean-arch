import { PlaceOrder } from '../../src/application/usecases/place-order/place-order';
import ItemRepositoryInMemory from '../../src/infra/repository/memory/item-repository-in-memory';
import CouponRepositoryInMemory from '../../src/infra/repository/memory/coupon-repository-in-memory';
import OrderRepositoryInMemory from '../../src/infra/repository/memory/order-repository-in-memory';

describe('place order', () => {
  it('should place an order with discount', async () => {
    const itemRepository = new ItemRepositoryInMemory();
    const couponRepository = new CouponRepositoryInMemory();
    const orderRepository = new OrderRepositoryInMemory();
    const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
    const input = {
      cpf: '935.411.347-80',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      date: new Date(),
      coupon: '20OFF',
    };
    const output = await placeOrder.invoke(input);
    expect(output.total).toBe(88);
  });
  it('should place an order with freight', async () => {
    const itemRepository = new ItemRepositoryInMemory();
    const couponRepository = new CouponRepositoryInMemory();
    const orderRepository = new OrderRepositoryInMemory();
    const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
    const input = {
      cpf: '935.411.347-80',
      orderItems: [
        { idItem: 4, quantity: 1 },
        { idItem: 5, quantity: 1 },
        { idItem: 6, quantity: 3 },
      ],
      date: new Date(),
    };
    const output = await placeOrder.invoke(input);
    expect(output.total).toBe(6350);
  });
});
