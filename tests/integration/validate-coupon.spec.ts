import PgPromiseConnectionAdapter from '../../src/infra/database/pg-promise-connection-adapter';
import ValidateCoupon from '../../src/application/usecases/validate-coupon/validate-coupon';
import CouponRepositoryDatabase from '../../src/infra/repository/database/coupon-repository-database';

const makeSut = (): ValidateCoupon => {
  const connection = PgPromiseConnectionAdapter.getInstance();
  const couponRepository = new CouponRepositoryDatabase(connection);
  return new ValidateCoupon(couponRepository);
};

describe('validate-coupon', () => {
  it('should validate the coupon', async () => {
    const sut = makeSut();
    const couponCode = '20OFF';
    const isValid = await sut.invoke(couponCode);
    expect(isValid).toBe(true);
  });
  it('should should throw if the coupon does not exists', async () => {
    const sut = makeSut();
    const couponCode = 'ANY-INVALID-COUPON';
    await expect(() => sut.invoke(couponCode)).rejects.toThrow();
  });
  it('should return false if coupon is expired', async () => {
    const sut = makeSut();
    const couponCode = '20OFF_EXPIRED';
    const isValid = await sut.invoke(couponCode);
    expect(isValid).toBe(false);
  });
});
