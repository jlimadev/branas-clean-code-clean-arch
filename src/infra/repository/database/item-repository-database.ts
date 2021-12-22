import { ItemRepository } from '../../../domain/repository/item-repository';
import Connection from '../../database/connection';
import { Item } from '../../../domain/entities/item';

export default class ItemRepositoryDatabase implements ItemRepository {
  constructor(private readonly connection: Connection) {}

  async findById(id: number): Promise<Item | undefined> {
    const query = 'SELECT * FROM ccca.item WHERE id_item = $1';
    const params = [id];
    const [itemData] = await this.connection.query(query, params);
    if (!itemData) return undefined;
    return new Item(
      itemData.id_item,
      itemData.category,
      itemData.description,
      itemData.price,
      itemData.width,
      itemData.height,
      itemData.length,
      itemData.weight,
    );
  }
}
