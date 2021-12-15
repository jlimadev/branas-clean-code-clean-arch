import PlaceOrderInput from './place-order-input';
import PlaceOrderOutput from './place-order-output';
import { ItemRepository } from '../../../domain/repository/item-repository';
import { Order } from '../../../domain/entities/order';
import { OrderRepository } from '../../../domain/repository/order-repository';
import { CouponRepository } from '../../../domain/repository/coupon-repository';
import { DefaultFreightCalculator } from '../../../domain/entities/default-freight-calculator';

export class PlaceOrder {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly orderRepository: OrderRepository,
    private readonly couponRepository: CouponRepository,
  ) {}

  async invoke(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const sequence = await this.orderRepository.count();
    const order = new Order(input.cpf, input.date, new DefaultFreightCalculator(), sequence);
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.findById(orderItem.idItem);
      if (!item) throw new Error('Item not found');
      order.addItem(item, orderItem.quantity);
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.findByCode(input.coupon);
      if (coupon) order.addCoupon(coupon);
    }
    await this.orderRepository.save(order);
    const total = order.getTotal();
    const orderId = order.getId();
    return new PlaceOrderOutput(orderId, total);
  }
}
