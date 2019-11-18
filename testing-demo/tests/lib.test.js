const lib = require("../lib");
const mail = require('../mail')
const db = require('../db')

describe("absoulute", () => {
  it("should return positive for positive input", () => {
    const outcome = lib.absolute(1);
    expect(outcome).toBe(1);
  });

  it("should return positive for negative input", () => {
    const outcome = lib.absolute(-1);
    expect(outcome).toBe(1);
  });

  it("should return zero for zero input", () => {
    const outcome = lib.absolute(0);
    expect(outcome).toBe(0);
  });
});

describe("greet", () => {
  it("should return greeting note", () => {
    const response = lib.greet("Muthu");
    //expect(response).toMatch(/Muthu/)
    expect(response).toContain("Muthu");
  });
});

describe("getCurrencies", () => {
  it("should return valid currencies", () => {
    const response = lib.getCurrencies();

    //Too Generic
    expect(response).toBeDefined();
    expect(response).not.toBeNull();

    //Too specific
    expect(response).toContain('USD')
    expect(response[1]).toBe('AUD')
    expect(response.length).toBe(3)

    //Best
    expect(response).toEqual(expect.arrayContaining(['USD', 'EUR', 'AUD']))
  });
});

describe('getProduct', () => {
  it('should return an object', () => {
    const result = lib.getProduct(1)
    //Do not use ToBe since it cheks object references
    //Too specific
    expect(result).toEqual({
      id: 1,
      price: 10
    })

    expect(result).toMatchObject({
      id: 1,
      price: 10
    })

    expect(result).toHaveProperty('id', 1)
  })
})

describe('registerUser', () => {
  it('should throw error for falsy username', () => {
    const args = [null, undefined, NaN, 0, '', false]
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a).toThrow()
      })
    })
  });

  it('should return user object', () => {
    const result = lib.registerUser('muthu')
    expect(result).toMatchObject({
      username: 'muthu'
    });
    expect(result.id).toBeGreaterThan(0)
  })
})

describe('notifyCustomer', () => {
  it('should send email to customer', () => {
    //Assign
    db.getCustomerSync = jest.fn().mockReturnValue({
      id: 1,
      points: 11,
      email: 'a'
    })
    mail.send = jest.fn()

    //Act
    lib.notifyCustomer({
      customerId: 1
    })

    //Assert
    expect(mail.send).toHaveBeenCalled()
    expect(mail.send.mock.calls[0][0]).toBe('a')
    expect(mail.send.mock.calls[0][1]).toMatch(/order/)

  })
})