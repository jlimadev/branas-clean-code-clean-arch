import PgPromiseConnectionAdapter from '../../src/infra/database/pg-promise-connection-adapter';
import ValidateCoupon from '../../src/application/usecases/validate-coupon/validate-coupon';
import CouponRepositoryDatabase from '../../src/infra/repository/database/coupon-repository-database';

describe('validate-coupon', () => {
  it('should validate the coupon', async () => {
    const connection = PgPromiseConnectionAdapter.getInstance();
    const couponRepository = new CouponRepositoryDatabase(connection);
    const validateCoupon = new ValidateCoupon(couponRepository);
    const couponCode = '20OFF';
    const isValid = await validateCoupon.invoke(couponCode);
    expect(isValid).toBe(true);
  });
});
