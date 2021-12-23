import { SimulateFreight } from '../../src/application/usecases/simulate-freight/simulate-freight';
import ItemRepositoryDatabase from '../../src/infra/repository/database/item-repository-database';
import { DefaultFreightCalculator } from '../../src/domain/entities/default-freight-calculator';
import PgPromiseConnectionAdapter from '../../src/infra/database/pg-promise-connection-adapter';
import SimulateFreightInput from '../../src/application/usecases/simulate-freight/simulate-freight-input';

describe('simulate-freight', () => {
  it('should simulate freight', async () => {
    const connection = PgPromiseConnectionAdapter.getInstance();
    const itemRepository = new ItemRepositoryDatabase(connection);
    const freightCalculator = new DefaultFreightCalculator();
    const simulateFreight = new SimulateFreight(itemRepository, freightCalculator);
    const input = new SimulateFreightInput([
      { idItem: 4, quantity: 1 },
      { idItem: 5, quantity: 1 },
      { idItem: 6, quantity: 3 },
    ]);
    const output = await simulateFreight.invoke(input);
    expect(output.amount).toBe(260);
  });
});
