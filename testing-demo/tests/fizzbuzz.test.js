const ex = require('../fizzbuzz')

describe('fizzBuzz', () => {
  it('should throw if input is not a number', () => {
    const args = [null, undefined, NaN, '', false, 'string']
    args.forEach((a) => {
      expect(() => {
        ex.fizzBuzz(a).toThrow()
      })
    })

  });

  it('should return FizzBuzz if divisible by both 3 and 5', () => {
    const result = ex.fizzBuzz(15)
    expect(result).toBe('FizzBuzz')
  });

  it('should return Fizz if divisible by 3 alone', () => {
    const result = ex.fizzBuzz(9)
    expect(result).toBe('Fizz')
  });

  it('should return Buzz if divisible by 5 alone', () => {
    const result = ex.fizzBuzz(20)
    expect(result).toBe('Buzz')
  });

  it('should return the input number if no conditions met', () => {
    const result = ex.fizzBuzz(22)
    expect(result).toBe(22)
  });
})