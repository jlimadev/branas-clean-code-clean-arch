import { DefaultFreightCalculator } from '../../domain/entities/default-freight-calculator';
import { defaultItem, makeItem } from '../factory/entities/item-factory';

const defaultFreightCalculator = new DefaultFreightCalculator();
describe('DefaultFreightCalculator', () => {
  it('should be defined', () => {
    expect(new DefaultFreightCalculator()).toBeDefined();
  });
  it('should calculate the freight', () => {
    const item = makeItem();
    expect(defaultFreightCalculator.calculate(item)).toBe(30);
  });
  it('should calculate the minimum freight', () => {
    const weight = 0.1456;
    const item = makeItem({ ...defaultItem, weight });
    expect(defaultFreightCalculator.calculate(item)).toBe(10);
  });
  it('should return zero if one of the calculation fields are undefined', () => {
    const item = makeItem({ ...defaultItem, weight: undefined as any });
    expect(defaultFreightCalculator.calculate(item)).toBe(0);
  });
});
