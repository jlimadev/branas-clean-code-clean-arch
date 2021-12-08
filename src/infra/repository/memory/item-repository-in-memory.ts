import { ItemRepository } from '../../../domain/repository/item-repository';
import { Item } from '../../../domain/entities/item';

export default class ItemRepositoryInMemory implements ItemRepository {
  items: Item[];

  constructor() {
    this.items = [
      new Item(1, 'Item 1', 'Description 1', 30),
      new Item(2, 'Item 2', 'Description 2', 50),
      new Item(3, 'Item 3', 'Description 3', 10),
      new Item(4, 'Item 4', 'Description 4', 1000, 100, 30, 10, 3),
      new Item(5, 'Item 5', 'Description 5', 5000, 100, 50, 50, 20),
      new Item(6, 'Item 6', 'Description 6', 30, 10, 10, 10, 0.9),
    ];
  }

  findById(id: number): Promise<Item | undefined> {
    return Promise.resolve(this.items.find((item) => item.id === id));
  }
}
