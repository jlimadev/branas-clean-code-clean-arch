import { CPF } from './cpf';
import { OrderItem } from './order-item';
import { Item } from './item';
import { Coupon } from './coupon';

export class Order {
  cpf: CPF;

  coupon: Coupon | undefined;

  orderItems: OrderItem[];

  constructor(readonly customerCpf: string) {
    this.cpf = new CPF(customerCpf);
    this.orderItems = [];
  }

  addCoupon(coupon: Coupon) {
    if (coupon.isExpired()) return;
    this.coupon = coupon;
  }

  addItem(item: Item, quantity: number) {
    this.orderItems.push(new OrderItem(item.id, item.price, quantity));
  }

  getTotal() {
    const total = this.orderItems.reduce((acc, item) => acc + item.getTotal(), 0);
    if (this.coupon) {
      return total - this.coupon.getDiscount(total);
    }
    return total;
  }
}
