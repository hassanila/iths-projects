import validatePersonalNumber from '../../src/utils/validatePersonalNumber';

describe('validatePersonalNumber', () => {
  it('returns true for valid personal numbers', () => {
    expect(validatePersonalNumber('011208-1234')).toBe(true);
    expect(validatePersonalNumber('0112081234')).toBe(true);
    expect(validatePersonalNumber('200112081234')).toBe(true);
    expect(validatePersonalNumber('20011208-1234')).toBe(true);
  });

  it('returns false for invalid personal numbers', () => {
    expect(validatePersonalNumber('011208-123')).toBe(false);
    expect(validatePersonalNumber('01120812345')).toBe(false);
    expect(validatePersonalNumber('0015012345')).toBe(false);
    expect(validatePersonalNumber('0009322345')).toBe(false);
    expect(validatePersonalNumber('20011208-12345')).toBe(false);
    expect(validatePersonalNumber('20000000-1234')).toBe(false);
  });
});
