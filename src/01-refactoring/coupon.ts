export class Coupon {
  constructor(
    private readonly code: string,
    private readonly percentage: number,
    private readonly expirationDate?: Date,
  ) {}

  getDiscount(amount: number): number {
    return (amount * this.percentage) / 100;
  }

  isExpired(today = new Date()) {
    if (!this.expirationDate) return false;
    return this.expirationDate < today;
  }
}
