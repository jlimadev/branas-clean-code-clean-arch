import { PlaceOrder } from '../../src/application/usecases/place-order/place-order';
import ItemRepositoryDatabase from '../../src/infra/repository/database/item-repository-database';
import PgPromiseConnectionAdapter from '../../src/infra/database/pg-promise-connection-adapter';
import CouponRepositoryDatabase from '../../src/infra/repository/database/coupon-repository-database';
import OrderRepositoryDatabase from '../../src/infra/repository/database/order-repository-database';

let orderRepository: OrderRepositoryDatabase;

const makeSut = () => {
  const connection = PgPromiseConnectionAdapter.getInstance();
  const itemRepository = new ItemRepositoryDatabase(connection);
  const couponRepository = new CouponRepositoryDatabase(connection);
  orderRepository = new OrderRepositoryDatabase(connection);
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
  date: new Date('2021-01-01T03:24:00'),
});

afterEach(async () => {
  await orderRepository.clear();
});

describe('place order', () => {
  it('should place an order with discount', async () => {
    const { sut } = makeSut();
    const input = {
      ...makeDefaultInput(),
      coupon: '20OFF',
    };
    const output = await sut.invoke(input);
    expect(output.total).toBe(138);
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
  it('should place an order with code/id', async () => {
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
    expect(output.id).toBe('202100000001');
  });
});
