import { makeItem } from '../factory/entities/item-factory';

describe('item', () => {
  it('should create an item', () => {
    const item = makeItem();
    expect(item.id).toBe(1);
  });
  it('should calculate the density', () => {
    const item = makeItem();
    expect(item.getDensity()).toBe(100);
  });
  it('should calculate the volume', () => {
    const item = makeItem();
    expect(item.getVolume()).toBe(0.03);
  });
});
