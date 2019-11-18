const lib = require('../lib')

describe('absoulute', () => {
  it('should return positive for positive input', () => {
    const outcome = lib.absolute(1)
    expect(outcome).toBe(1)
  })

  it('should return positive for negative input', () => {
    const outcome = lib.absolute(-1)
    expect(outcome).toBe(1)
  })

  it('should return zero for zero input', () => {
    const outcome = lib.absolute(0)
    expect(outcome).toBe(0)
  })
})

describe('greet', () => {
  it('should return greeting note', () => {
    const response = lib.greet('Muthu')
    //expect(response).toMatch(/Muthu/)
    expect(response).toContain('Muthu')
  })
})

describe('getCurrencies', () => {
  it('should return valid currencies', () => {
    const response = lib.getCurrencies()
    expect(response).toContain
  })
})