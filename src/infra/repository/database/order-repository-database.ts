import { OrderRepository } from '../../../domain/repository/order-repository';
import Connection from '../../database/connection';
import { Order } from '../../../domain/entities/order';

export default class OrderRepositoryDatabase implements OrderRepository {
  constructor(private readonly connection: Connection) {}

  async save(order: Order): Promise<void> {
    const orderQuery = `
      insert into ccca.order (code, cpf, issue_date, freight, sequence, coupon) 
      values ($1, $2, $3, $4, $5, $6) returning  *
    `;
    const params = [
      order.getId(),
      order.getCpf(),
      order.date,
      order.getFreight(),
      order.sequence,
      order.coupon?.code,
    ];
    const [orderData] = await this.connection.query(orderQuery, params);
    for (const orderItem of order.getOrderItems()) {
      const orderItemQuery = `
        insert into ccca.order_item (id_item, id_order, price, quantity) 
        values ($1, $2, $3, $4)
      `;
      const orderItemParams = [
        orderItem.id,
        orderData.id_order,
        orderItem.price,
        orderItem.quantity,
      ];
      await this.connection.query(orderItemQuery, orderItemParams);
    }
  }

  async count(): Promise<number> {
    const query = 'SELECT COUNT(*)::int AS count FROM ccca.order';
    const [data] = await this.connection.query(query, []);
    return data.count;
  }

  async clear(): Promise<void> {
    await this.connection.query('DELETE FROM ccca.order_item', []);
    await this.connection.query('DELETE FROM ccca.order', []);
  }
}
