import { Coupon } from './coupon';

describe('coupon', () => {
  it('should calculate the discount', () => {
    const coupon = new Coupon('20FF', 20);
    expect(coupon.getDiscount(100)).toBe(20);
  });
  it('should return true when coupon is expired', () => {
    const couponExpiredDate = new Date('2000-01-01');
    const coupon = new Coupon('20FF', 20, couponExpiredDate);
    expect(coupon.isExpired()).toBe(true);
  });
  it('should return false if coupon is not expired', () => {
    const mockDate = new Date();
    const couponValidDate = new Date(mockDate.getTime() + 1000 * 10);
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any);
    const coupon = new Coupon('20FF', 20, couponValidDate);
    expect(coupon.isExpired()).toBe(false);
  });
  it('should return isExpired as false when coupon has no expiration date', () => {
    const coupon = new Coupon('20FF', 20);
    expect(coupon.isExpired()).toBe(false);
  });
});
