import { Item } from './item';
import { FreightCalculator } from '../interfaces/freight-calculator';

export class DefaultFreightCalculator implements FreightCalculator {
  private readonly MINIMUM_FREIGHT_PRICE = 10;
  private readonly FIXED_DISTANCE = 1000;

  calculate(item: Item): number {
    if (!item.width || !item.height || !item.length || !item.weight) return 0;
    const freight = this.FIXED_DISTANCE * item.getVolume() * (item.getDensity() / 100);
    return Math.max(this.MINIMUM_FREIGHT_PRICE, freight);
  }
}
