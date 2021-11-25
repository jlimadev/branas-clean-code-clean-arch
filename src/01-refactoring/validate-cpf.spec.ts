import { validate } from './validate-cpf';

describe('validate cpf', () => {
  it('should return true when cpf is valid', () => {
    const cpf = '935.411.347-80';
    const result = validate(cpf);
    expect(result).toBeTruthy();
  });
  it('should return false when cpf has all digits equals', () => {
    const cpf = '111.111.111-11';
    const result = validate(cpf);
    expect(result).toBeFalsy();
  });
  it('should return false when cpf is valid invalid', () => {
    const cpf = '23.456.789-99';
    const result = validate(cpf);
    expect(result).toBeFalsy();
  });
  it('should return false when cpf null', () => {
    const cpf = null;
    const result = validate(cpf as any);
    expect(result).toBeFalsy();
  });
});
