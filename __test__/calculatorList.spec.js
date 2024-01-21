// calculatorList.spec.js

const CalculatorList = require('../calculatorList');

describe('CalculatorList', () => {
  let calculatorList;

  beforeEach(() => {
    calculatorList = new CalculatorList();
  });

  test('init - should initialize a new calculator', () => {
    const result = calculatorList.init('add', 3, 4);
    expect(result).toEqual({ result: 7, totalOps: 1, id: 100 });
  });

  test('init - invalid operator should throw an error', () => {
    expect( () => calculatorList.init('percentage', 3,4) ).toThrow('Invalid operator');
  });

  test('init - invalid number should throw an error', () => {
    expect( () => calculatorList.init('multiply',"3",4) ).toThrow('Invalid number');
  });

  test('init - invalid number should throw an error', () => {
    expect( () => calculatorList.init('multiply',3,"4") ).toThrow('Invalid number');
  });

  test('performOperation - should perform a new operation', () => {
    calculatorList.init('add', 3, 4);
    const result = calculatorList.performOperation('add', 2, 100);
    expect(result).toEqual({ result: 9, totalOps: 2, id: 100 });
  });

  test('performOperation - should handle non-progressing operation', () => {
    calculatorList.init('add', 3, 4);
    const result = calculatorList.performOperation('add', 0, 100);
    expect(result).toEqual({
      result: 7,
      totalOps: 1,
      id: 100,
      message: 'This operation is not making progress.(Hint: Other operand is 7)',
    });
  });

  test('performOperation - divide by 0 should throw an error', () => {
    calculatorList.init('add', 3, 4);
    expect( () => {calculatorList.performOperation('divide', 0, 100)} ).toThrow('Cannot divide by 0.');
  });
  
  test('performOperation - invalid operator should throw an error', () => {
    calculatorList.init('add', 3, 4);
    expect( () => {calculatorList.performOperation('volume', 2, 100)} ).toThrow('Invalid operator');
  });


  test('performOperation - invalid number should throw an error', () => {
    calculatorList.init('add', 3, 4);
    expect( ()=> {calculatorList.performOperation('add', "4", 100)} ).toThrow('Invalid number');
  });

  test('performOperation - should handle non-existent calculator', () => {
    expect(() => calculatorList.performOperation('add', 5, 123)).toThrow('Invalid calculator instance Id : 123.');
  });

  test('undo - should undo the last operation', () => {
    calculatorList.init('add', 3, 4);
    calculatorList.performOperation('multiply', 2, 100);
    const result = calculatorList.undo(100);
    expect(result).toEqual({ result: 7, totalOps: 1, id: 100 });
  });

  test('undo - should reset to initial state if only one operation', () => {
    calculatorList.init('add', 3, 4);
    const result = calculatorList.undo(100);
    expect(result).toEqual({ result: 0, totalOps: 0, id: 100 });
  });

  test('undo - no undo possible on initial state', () => {
    calculatorList.init('add', 3, 4);
    calculatorList.undo(100);
    const result = calculatorList.undo(100);
    expect(result).toEqual({ result: 0, totalOps: 0, id: 100 , message : "calculator 100 is at its initial state, no further Undo possible."});
  });

   test('undo - should handle non-existent calculator', () => {
    expect(() =>  calculatorList.undo(123) ).toThrow('Invalid calculator instance Id : 123.');
  });

 

  test('undo - should handle invalid calculator ID', () => {
    expect(() => calculatorList.undo('invalid_id')).toThrow('Invalid calculator ID. Must be a number.');
  });

  test('reset - should reset the calculator to initial state', () => {
    calculatorList.init('add', 3, 4);
    const result = calculatorList.reset(100);
    expect(result).toEqual({ success: true, message: 'calculator 100 is now reset' });
  });

   test('reset - should handle non-existent calculator', () => {
    expect(() =>  calculatorList.reset(123) ).toThrow('Invalid calculator instance Id : 123.');
  });


  test('reset - should handle invalid calculator ID', () => {
    expect(() => calculatorList.reset('invalid_id')).toThrow('Invalid calculator ID. Must be a number.');
  });
  
  test('error handling - invalid calculator ID', () => {
    expect(() => calculatorList.validate('abc')).toThrow('Invalid calculator ID. Must be a number.');
  });
  
});
