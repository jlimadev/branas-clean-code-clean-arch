export class CPF {
  CPF_COEFFICIENT = 11;

  CPF_VALID_LENGTH = 11;

  constructor(readonly value: string) {
    if (!this.isValid(value)) throw new Error(`CPF ${value} is not valid`);
  }

  private getDigitsFromCPF = (cpf: string): string => cpf.replace(/\D/g, '');

  private allDigitsAreEquals = (cpf: string): boolean => {
    const firstDigit = cpf[0];
    return [...cpf].every((digit) => digit === firstDigit);
  };

  private calculateVerifierDigit = (cpfDigits: string) => {
    let multiplier = 2;
    const digitsSum = Array.from(cpfDigits).reduceRight((acc, digit) => {
      const sum = acc + multiplier * parseInt(digit);
      multiplier++;
      return sum;
    }, 0);
    const rest = digitsSum % this.CPF_COEFFICIENT;
    return rest < 2 ? 0 : this.CPF_COEFFICIENT - rest;
  };

  isValid = (cpf: string): boolean => {
    if (!cpf) return false;
    const cpfDigits = this.getDigitsFromCPF(cpf);
    if (cpfDigits.length !== this.CPF_VALID_LENGTH) return false;
    if (this.allDigitsAreEquals(cpfDigits)) return false;
    const cpfWithNoVerifierDigits = cpfDigits.slice(0, -2);
    const firstDigit = this.calculateVerifierDigit(cpfWithNoVerifierDigits);
    const secondDigit = this.calculateVerifierDigit(`${cpfWithNoVerifierDigits}${firstDigit}`);
    const currentVerifierDigits = cpfDigits.slice(-2);
    const calculatedVerifierDigits = `${firstDigit}${secondDigit}`;
    return currentVerifierDigits === calculatedVerifierDigits;
  };
}
