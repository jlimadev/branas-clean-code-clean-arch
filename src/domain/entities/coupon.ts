export class Coupon {
  constructor(readonly code: string, readonly percentage: number, readonly expirationDate?: Date) {}

  isValid(today: Date = new Date()) {
    if (!this.expirationDate) return true;
    return this.expirationDate.getTime() >= today.getTime();
  }

  isExpired(today: Date = new Date()) {
    return !this.isValid(today);
  }

  calculateDiscount(amount: number, today: Date = new Date()): number {
    if (this.isExpired(today)) return 0;
    return (amount * this.percentage) / 100;
  }
}
