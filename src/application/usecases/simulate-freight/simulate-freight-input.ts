type SimulateFreightItem = {
  idItem: number;
  quantity: number;
};

export default class SimulateFreightInput {
  constructor(readonly items: SimulateFreightItem[]) {}
}
