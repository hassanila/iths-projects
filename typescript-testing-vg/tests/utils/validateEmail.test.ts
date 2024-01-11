import validateEmail from '../../src/utils/validateEmail';

describe('validateEmail', () => {
  it('returns true for valid email addresses', () => {
    expect(validateEmail('hi97@gmail.com')).toBe(true);
    expect(validateEmail('iths2023@iths.se')).toBe(true);
  });

  it('returns false for invalid email addresses', () => {
    expect(validateEmail('hi97gmail.com')).toBe(false);
    expect(validateEmail('iths2023@iths')).toBe(false);
    expect(validateEmail('iths2023@.se')).toBe(false);
  });
});
