import { Coupon } from '../../src/domain/entities/coupon';

describe('coupon', () => {
  it('should create a valid coupon', () => {
    const coupon = new Coupon('20OFF', 20, new Date('2021-12-10'));
    const today = new Date('2021-12-01');
    const isValid = coupon.isValid(today);
    expect(isValid).toBeTruthy();
  });
  it('should return true when coupon is expired', () => {
    const coupon = new Coupon('20FF', 20, new Date('2000-01-01'));
    expect(coupon.isExpired(new Date())).toBeTruthy();
  });
  it('should return false if coupon is not expired', () => {
    const coupon = new Coupon('20FF', 20, new Date('2021-01-01'));
    expect(coupon.isExpired(new Date('2020-01-01'))).toBeFalsy();
  });
  it('should return isExpired as false when coupon has no expiration date', () => {
    const coupon = new Coupon('20FF', 20);
    expect(coupon.isExpired()).toBeFalsy();
  });
  it('should calculate the discount', () => {
    const coupon = new Coupon('20FF', 20);
    expect(coupon.calculateDiscount(100)).toBe(20);
  });
});
