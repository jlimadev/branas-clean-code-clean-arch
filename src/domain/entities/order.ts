import { CPF } from './cpf';
import { OrderItem } from './order-item';
import { Item } from './item';
import { Coupon } from './coupon';
import { DefaultFreightCalculator } from './default-freight-calculator';
import { FreightCalculator } from '../interfaces/freight-calculator';
import OrderId from './order-id';

export class Order {
  private readonly cpf: CPF;
  private coupon: Coupon | undefined;
  private orderItems: OrderItem[];
  private freight: number;
  private readonly orderId: string;

  constructor(
    readonly customerCpf: string,
    readonly date: Date = new Date(),
    readonly freightCalculator: FreightCalculator = new DefaultFreightCalculator(),
    readonly sequence: number = 1,
  ) {
    this.cpf = new CPF(customerCpf);
    this.orderItems = [];
    this.freight = 0;
    this.orderId = new OrderId(this.date, this.sequence).getId();
  }

  addCoupon(coupon: Coupon) {
    if (coupon.isExpired(this.date)) return;
    this.coupon = coupon;
  }

  addItem(item: Item, quantity: number) {
    this.orderItems.push(new OrderItem(item.id, item.price, quantity));
    this.freight += this.freightCalculator.calculate(item) * quantity;
  }

  getId(): string {
    return this.orderId;
  }

  getFreight(): number {
    return this.freight;
  }

  getTotal() {
    let total = this.orderItems.reduce((acc, item) => acc + item.getTotal(), 0);
    if (this.coupon) {
      total -= this.coupon.calculateDiscount(total, this.date);
    }
    total += this.freight;
    return total;
  }
}
