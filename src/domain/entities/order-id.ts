export default class OrderId {
  private readonly value: string;

  constructor(readonly date: Date = new Date(), readonly sequence: number = 1) {
    this.value = this.generateId(date, sequence);
  }

  getId(): string {
    return this.value;
  }

  private generateId = (date: Date, sequence: number): string => {
    const year = date.getFullYear();
    const sequenceValue = sequence.toString().padStart(8, '0');
    return `${year}${sequenceValue}`;
  };
}
