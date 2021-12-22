import { CouponRepository } from '../../../domain/repository/coupon-repository';
import { Coupon } from '../../../domain/entities/coupon';
import Connection from '../../database/connection';

export default class CouponRepositoryDatabase implements CouponRepository {
  constructor(private readonly connection: Connection) {}

  async findByCode(code: string): Promise<Coupon | undefined> {
    const query = 'SELECT * FROM ccca.coupon WHERE code = $1';
    const params = [code];
    const [couponData] = await this.connection.query(query, params);
    if (!couponData) return undefined;
    return new Coupon(couponData.code, couponData.percentage, couponData.expire_date);
  }
}
