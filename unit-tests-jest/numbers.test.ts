import { evenNumbers, toDollars, divideBy, multiplyBy } from './numbers';

describe('evenNumbers', () => {
  it('returns the even numbers', () => {
    const numbers = [1, 4, 5, 10, 0];
    const result = evenNumbers(numbers);
    expect(result).toEqual([4, 10, 0]);
  });
  it('returns an empty array', () => {
    const input: [] = [];
    const result = evenNumbers(input);
    expect(result).toEqual([]);
  });
});

describe('toDollars', () => {
  it('formats the amount', () => {
    const amount = 10.75;
    const result = toDollars(amount);
    expect(result).toEqual('$10.75');
  });
  it('formats zero', () => {
    const amount = 0;
    const result = toDollars(amount);
    expect(result).toEqual('$0.00');
  });
});

describe('divideBy', () => {
  it('divides by two', () => {
    const numbers = [1, 2, 3, 25, 42, 0];
    const divisor = 2;
    const result = divideBy(numbers, divisor);
    expect(result).toEqual([0.5, 1, 1.5, 12.5, 21, 0]);
  });
  it('does not modify input', () => {
    const numbers = [2];
    const divisor = 2;
    divideBy(numbers, divisor);
    expect(numbers).toEqual([2]);
  });
});

describe('multiplyBy', () => {
  it('multiplies the values', () => {
    const obj = {
      a: 1,
      'billy bob joe': 2,
      true: 3,
      zero: 0,
    };
    const multiplier = 2;
    const result = multiplyBy(obj, multiplier);
    expect(result).toEqual({ a: 2, 'billy bob joe': 4, true: 6, zero: 0 });
  });
  it('does not multiply non-number values', () => {
    const obj = {
      a: 1,
      b: '12',
      c: [1, 'hello', false],
      d: true,
      f: 'string',
    };
    const multiplier = 3;
    const result = multiplyBy(obj, multiplier);
    expect(result).toEqual({
      a: 3,
      b: '12',
      c: [1, 'hello', false],
      d: true,
      f: 'string',
    });
  });
  it('modifies the object instead of creating a new one', () => {
    const obj = {
      a: 4,
      b: 2,
      c: 0,
    };
    const multiplier = 4;
    const result = multiplyBy(obj, multiplier);
    expect(result).toBe(obj);
  });
  it('does nothing with an empty object', () => {
    const obj = {};
    const multiplier = 2;
    const result = multiplyBy(obj, multiplier);
    expect(result).toEqual({});
  });
});
