import { basicPluralise } from '../';

describe('basicPluralise', () => {
  test('returns \'cows\' for \'cow\' and count > 1', () => {
    expect(basicPluralise('cow', 2)).toBe('cows');
  });
  test('returns \'cow\' for \'cow\' and count = 1', () => {
    expect(basicPluralise('cow', 1)).toBe('cow');
  });
  test('returns \'cows\' for \'cow\' and count = 0', () => {
    expect(basicPluralise('cow', 0)).toBe('cows');
  });

  test('returns \'families\' for \'family\' and count > 1', () => {
    expect(basicPluralise('family', 2)).toBe('families');
  });
  test('returns \'family\' for \'family\' and count = 1', () => {
    expect(basicPluralise('family', 1)).toBe('family');
  });
  test('returns \'families\' for \'family\' and count = 0', () => {
    expect(basicPluralise('family', 0)).toBe('families');
  });
});
