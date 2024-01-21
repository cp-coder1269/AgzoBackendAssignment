class Calculator {
  constructor(id, result, operator, num1, num2) {
    this.id = id;
    this.resultStack = [result];
    this.operatorStack = [operator];
    this.operandStack = [num1, num2];
  }
}
module.exports = { Calculator };