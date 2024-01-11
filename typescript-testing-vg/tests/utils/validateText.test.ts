import validateText from '../../src/utils/validateText';

describe('validateText', () => {
  it('returns true for valid text', () => {
    expect(validateText('Hello World')).toBe(true);
    expect(validateText('test text 123')).toBe(true);
    expect(validateText('abc')).toBe(true);
  });

  it('returns false for invalid text', () => {
    expect(validateText('')).toBe(false);
    expect(validateText('a')).toBe(false);
  });
});
