import { Item } from '../../../domain/entities/item';

export const defaultItem = {
  id: 1,
  category: 'anyCategory',
  description: 'anyDescription',
  price: 1000,
  width: 100,
  height: 30,
  length: 10,
  weight: 3,
};

export const makeItem = (item = defaultItem) => {
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
