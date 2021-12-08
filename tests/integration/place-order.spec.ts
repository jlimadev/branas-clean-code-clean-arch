import { PlaceOrder } from '../../src/application/usecases/place-order/place-order';
import ItemRepositoryInMemory from '../../src/infra/repository/memory/item-repository-in-memory';
import CouponRepositoryInMemory from '../../src/infra/repository/memory/coupon-repository-in-memory';
import OrderRepositoryInMemory from '../../src/infra/repository/memory/order-repository-in-memory';

const makeSut = () => {
  const itemRepository = new ItemRepositoryInMemory();
  const couponRepository = new CouponRepositoryInMemory();
  const orderRepository = new OrderRepositoryInMemory();
  const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
  return {
    sut: placeOrder,
    itemRepository,
    couponRepository,
    orderRepository,
  };
};

const makeDefaultInput = () => ({
  cpf: '935.411.347-80',
  orderItems: [
    { idItem: 1, quantity: 1 },
    { idItem: 2, quantity: 1 },
    { idItem: 3, quantity: 3 },
  ],
  date: new Date(),
});

describe('place order', () => {
  it('should place an order with discount', async () => {
    const { sut } = makeSut();
    const input = {
      ...makeDefaultInput(),
      coupon: '20OFF',
    };
    const output = await sut.invoke(input);
    expect(output.total).toBe(88);
  });
  it('should place an order with freight', async () => {
    const { sut } = makeSut();
    const input = {
      ...makeDefaultInput(),
      orderItems: [
        { idItem: 4, quantity: 1 },
        { idItem: 5, quantity: 1 },
        { idItem: 6, quantity: 3 },
      ],
    };
    const output = await sut.invoke(input);
    expect(output.total).toBe(6350);
  });
  it('should call itemRepository with correct data', async () => {
    const { sut, itemRepository } = makeSut();
    const itemRepositorySpy = jest.spyOn(itemRepository, 'findById');
    const input = {
      ...makeDefaultInput(),
    };
    await sut.invoke(input);
    expect(itemRepositorySpy).toHaveBeenCalledTimes(3);
    expect(itemRepositorySpy).toHaveBeenNthCalledWith(1, 1);
    expect(itemRepositorySpy).toHaveBeenNthCalledWith(2, 2);
    expect(itemRepositorySpy).toHaveBeenNthCalledWith(3, 3);
  });
  it('should call couponRepository with correct data', async () => {
    const { sut, couponRepository } = makeSut();
    const itemRepositorySpy = jest.spyOn(couponRepository, 'findByCode');
    const input = {
      ...makeDefaultInput(),
      coupon: '20OFF',
    };
    await sut.invoke(input);
    expect(itemRepositorySpy).toHaveBeenCalledTimes(1);
    expect(itemRepositorySpy).toHaveBeenCalledWith('20OFF');
  });
});
