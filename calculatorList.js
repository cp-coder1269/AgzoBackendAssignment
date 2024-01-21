
const { Calculator } = require('./calculator');

class CalculatorList {
  constructor() {
    this.calculatorList = new Map();
    this.lastAssignedId = 100;
  }

  // Initialize a new calculator instance and add to the Calculator list
  init(operator, num1, num2) {
    const id = this.lastAssignedId++;
    const result = this.calculate(operator, num1, num2);
    const calculator = new Calculator(id, result, operator, num1, num2);
    this.calculatorList.set(id, calculator);
    return { result: calculator.resultStack[calculator.resultStack.length-1], totalOps: calculator.operatorStack.length, id: calculator.id };
  }

  // Perform a new operation on an existing calculator, using past result as a first operand
  performOperation(operator, num, id) {
    this.validate(id);
    const calculator = this.calculatorList.get(Number(id));
    if( this.isProgress(calculator.resultStack[calculator.resultStack.length-1], operator, num) ){
        calculator.resultStack.push( this.calculate(operator, calculator.resultStack[calculator.resultStack.length-1], num) ) ;
        calculator.operatorStack.push(operator);
        calculator.operandStack.push(num);
        return { result: calculator.resultStack[calculator.resultStack.length-1], totalOps: calculator.operatorStack.length, id: calculator.id };
    }
    const message = `This operation is not making progress.(Hint: Other operand is ${calculator.resultStack[calculator.resultStack.length-1]})`;
    return { result: calculator.resultStack[calculator.resultStack.length-1], totalOps: calculator.operatorStack.length, id: calculator.id, message : message};
  }

  // Undo the last operation on a calculator
  undo(id){
    this.validate(id);
    const calculator = this.calculatorList.get(Number(id));
    if(calculator.operatorStack.length > 1){
        calculator.operatorStack.pop();
        calculator.operandStack.pop();
        calculator.resultStack.pop();
        return { result: calculator.resultStack[calculator.resultStack.length-1], totalOps: calculator.operatorStack.length, id: calculator.id };
    } else if(calculator.operatorStack.length > 0){
        //only one operator, reset to initial state
        calculator.operatorStack.pop();

        calculator.operandStack.pop();
        calculator.operandStack.pop();

        calculator.resultStack.pop();
        calculator.resultStack.push( 0 );

        return { result: calculator.resultStack[calculator.resultStack.length-1], totalOps: calculator.operatorStack.length, id: calculator.id };
    } else{
        const message = `calculator ${id} is at its initial state, no further Undo possible.`;
        return { result: calculator.resultStack[calculator.resultStack.length-1], totalOps: calculator.operatorStack.length, id: calculator.id, message : message};
    }
    
  }

  // Reset a calculator to its initial state
  reset(id){
    this.validate(id);
    const calculator = this.calculatorList.get(Number(id));
    calculator.resultStack.length = 0;
    calculator.resultStack.push(0);//for further operations starting with 0;
    calculator.operatorStack.length = 0;
    calculator.operandStack.length = 0;
     return { success:true, message:`calculator ${id} is now reset` };
  }

  // Perform the actual calculation based on the operator
  calculate(operator, num1, num2) {
    switch (operator) {
      case 'add':
        return num1 + num2;
      case 'subtract':
        return num1 - num2;
      case 'multiply':
        return num1 * num2;
      case 'divide':
        if(num2 === 0)
             throw new Error('Cannot divide by 0.');
        return num1 / num2;
      default:
        throw new Error('Invalid operator');
    }
  }

  // Validate if the given calculator is valid
  validate(id){
    const numericId = Number(id);  
    if (isNaN(numericId) || typeof numericId !== 'number') {
        throw new Error('Invalid calculator ID. Must be a number.');
    }

    if(!this.calculatorList.has(Number(id))){
        throw new Error(`Invalid calculator instance Id : ${id}.`);
    }

  }
  // Based on the operator and operandStack checking if the current operation is progressing or not
  isProgress(currResult, operator, num){
    switch (operator) {
      case 'add':
      case 'subtract':
        return num !== 0;
      case 'multiply':
            return currResult !== 0 && num !== 1;
      case 'divide':
        if(num === 0){
             throw new Error('Cannot divide by 0.');
        }
        return currResult !== 0 && num !== 1;
      default:
        throw new Error('Invalid operator');
    }
  }
}

module.exports = CalculatorList;
