import { CPF } from '../../domain/entities/cpf';

describe('cpf validator', () => {
  it('should return true when cpf is valid', () => {
    const cpf = '935.411.347-80';
    expect(cpf).toBe(new CPF(cpf).value);
  });
  it('should return false when cpf has all digits equals', () => {
    const cpf = '111.111.111-11';
    expect(() => new CPF(cpf)).toThrow(new Error(`CPF ${cpf} is not valid`));
  });
  it('should return false when cpf is valid invalid', () => {
    const cpf = '23.456.789-99';
    expect(() => new CPF(cpf)).toThrow(new Error(`CPF ${cpf} is not valid`));
  });
  it('should return false when cpf null', () => {
    const cpf = null;
    expect(() => new CPF(cpf as any)).toThrow(new Error(`CPF ${cpf} is not valid`));
  });
});
