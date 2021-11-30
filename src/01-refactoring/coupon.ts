export class Coupon {
  constructor(private readonly code: string, private readonly percentage: number) {}

  getDiscount(amount: number): number {
    return (amount * this.percentage) / 100;
  }
}
