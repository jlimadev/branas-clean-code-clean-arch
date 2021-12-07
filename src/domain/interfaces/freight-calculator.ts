import { Item } from '../entities/item';

export interface FreightCalculator {
  calculate(item: Item): number;
}
