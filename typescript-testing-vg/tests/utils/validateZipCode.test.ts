import validateZipCode from '../../src/utils/validateZipCode';

describe('validateZipCode', () => {
  it('returns true for valid zip codes', () => {
    expect(validateZipCode('123 45')).toBe(true);
    expect(validateZipCode('12345')).toBe(true);
  });

  it('returns false for invalid zip codes', () => {
    expect(validateZipCode('1234')).toBe(false);
    expect(validateZipCode('123456')).toBe(false);
  });
});
