import { Coupon } from '../../domain/entities/coupon';

describe('coupon', () => {
  describe('getDiscount', () => {
    it('should calculate the discount', () => {
      const coupon = new Coupon('20FF', 20);
      expect(coupon.getDiscount(100)).toBe(20);
    });
  });
  describe('isExpired', () => {
    it('should return true when coupon is expired', () => {
      const couponExpiredDate = new Date('2000-01-01');
      const coupon = new Coupon('20FF', 20, couponExpiredDate);
      expect(coupon.isExpired(new Date())).toBeTruthy();
    });
    it('should return false if coupon is not expired', () => {
      const expirationDate = new Date('2021-01-01');
      const coupon = new Coupon('20FF', 20, expirationDate);
      expect(coupon.isExpired(new Date('2020-01-01'))).toBeFalsy();
    });
    it('should return isExpired as false when coupon has no expiration date', () => {
      const coupon = new Coupon('20FF', 20);
      expect(coupon.isExpired()).toBeFalsy();
    });
  });
});
