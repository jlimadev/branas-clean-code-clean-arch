import { Item } from './item';

const defaultItem = {
  id: 1,
  category: 'anyCategory',
  description: 'anyDescription',
  price: 1000,
  width: 100,
  height: 30,
  length: 10,
  weight: 3,
};

const makeItem = (item = defaultItem) => {
  return new Item(
    item.id,
    item.category,
    item.description,
    item.price,
    item.width,
    item.height,
    item.length,
    item.weight,
  );
};

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
  it('should calculate the freight', () => {
    const item = makeItem();
    const distance = 1000;
    expect(item.getFreight(distance)).toBe(30);
  });
  it('should calculate the minimum freight', () => {
    const distance = 1000;
    const weight = 0.1456;
    const item = makeItem({ ...defaultItem, weight });
    expect(item.getFreight(distance)).toBe(10);
  });
});
