import { CouponRepository } from '../../../domain/repository/coupon-repository';
import { Coupon } from '../../../domain/entities/coupon';

export default class CouponRepositoryInMemory implements CouponRepository {
  coupons: Coupon[];

  constructor() {
    this.coupons = [new Coupon('20OFF', 20)];
  }

  findByCode(code: string): Promise<Coupon | undefined> {
    return Promise.resolve(this.coupons.find((coupon) => coupon.code === code));
  }
}
