export default class OrderCode {
  private readonly value: string;

  constructor(readonly date: Date = new Date(), readonly sequence: number = 1) {
    this.value = this.generateCode(date, sequence);
  }

  getCode(): string {
    return this.value;
  }

  generateCode(date: Date, sequence: number): string {
    const year = date.getFullYear();
    const sequenceValue = sequence.toString().padStart(8, '0');
    return `${year}${sequenceValue}`;
  }
}
