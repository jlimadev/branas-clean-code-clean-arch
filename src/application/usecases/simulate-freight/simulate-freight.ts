import { ItemRepository } from '../../../domain/repository/item-repository';
import { FreightCalculator } from '../../../domain/interfaces/freight-calculator';
import SimulateFreightInput from './simulate-freight-input';
import SimulateFreightOutput from './simulate-freight-output';

export class SimulateFreight {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly freightCalculator: FreightCalculator,
  ) {}

  async invoke(input: SimulateFreightInput): Promise<SimulateFreightOutput> {
    let amount = 0;
    for (const inputItem of input.items) {
      const item = await this.itemRepository.findById(inputItem.idItem);
      if (!item) throw new Error('Item not found');
      amount += this.freightCalculator.calculate(item) * inputItem.quantity;
    }
    return new SimulateFreightOutput(amount);
  }
}
