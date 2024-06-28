
const handeSum = (a?: number ,b?: number) =>{
    return a && b ? a+b : 0
}


describe('sum function', () => {
  it('should return the sum of two numbers', () => {
    expect(handeSum(1, 2)).toBe(3);
  });

  it('should return 0 for no arguments', () => {
    expect(handeSum()).toBe(0);
  });
});
