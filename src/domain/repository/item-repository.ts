import { Item } from '../entities/item';

export interface ItemRepository {
  findById(id: number): Promise<Item | undefined>;
}
