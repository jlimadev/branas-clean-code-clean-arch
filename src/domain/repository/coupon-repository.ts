import { Coupon } from '../entities/coupon';

export interface CouponRepository {
  findByCode(code: string): Promise<Coupon | undefined>;
}
