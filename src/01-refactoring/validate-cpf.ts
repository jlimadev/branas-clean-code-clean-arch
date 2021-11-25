const getDigitsFromCPF = (cpf: string): string => cpf.replace(/\D/g, "");

const allDigitsAreEquals = (cpf: string): boolean => {
  return cpf.split("").every((digit) => digit === cpf[0]);
};

const calculateVerifierDigit = (cpfDigits: string) => {
  let multiplier = 2;
  const digitsSum = Array.from(cpfDigits).reduceRight((acc, digit) => {
    const sum = acc + multiplier * parseInt(digit, 10);
    multiplier++;
    return sum;
  }, 0);
  const rest = digitsSum % 11;
  return rest < 2 ? 0 : 11 - rest;
};

export const validate = (cpf: string): boolean => {
  if (!cpf) return false;
  const cpfDigits = getDigitsFromCPF(cpf);
  if (cpfDigits.length !== 11) return false;
  if (allDigitsAreEquals(cpfDigits)) return false;
  const cpfWithNoVerifierDigits = cpfDigits.slice(0, -2);
  const firstDigit = calculateVerifierDigit(cpfWithNoVerifierDigits);
  const secondDigit = calculateVerifierDigit(`${cpfWithNoVerifierDigits}${firstDigit}`);
  const currentVerifierDigits = cpfDigits.slice(-2);
  const calculatedVerifierDigits = `${firstDigit}${secondDigit}`;
  return currentVerifierDigits == calculatedVerifierDigits;
};
