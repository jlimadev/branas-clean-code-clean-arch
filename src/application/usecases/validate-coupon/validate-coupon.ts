import { CouponRepository } from '../../../domain/repository/coupon-repository';

export default class ValidateCoupon {
  constructor(private readonly couponRepository: CouponRepository) {}

  async invoke(couponCode: string): Promise<boolean> {
    const coupon = await this.couponRepository.findByCode(couponCode);
    if (!coupon) throw new Error('Coupon not found');
    return coupon.isValid();
  }
}
