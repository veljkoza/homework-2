class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
      this.currentOperand = this.currentOperand.toString().substring(0,this.currentOperand.length-1)
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    this.updateDisplay();
  }

  compute() {
    let sum;
    const previous = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(previous) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        sum = previous + current;
        break;
      case "-":
        sum = previous - current;
        break;
      case "*":
        sum = previous * current;
        break;
      case "÷":
        sum = previous / current;
        break;

      default:
        return;
    }

    this.currentOperand = sum;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number){
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split(".")[1];

      let integerDisplay;
      if(isNaN(integerDigits)){
          integerDisplay = ""
      }else{
          integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits: 0})
      }

      if(decimalDigits != null){
          return integerDisplay +"." +decimalDigits;
      }else{
          return integerDisplay;
      }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    if(this.operation != null){
    this.previousOperandTextElement.innerText = this.getDisplayNumber(this.previousOperand) + " " + this.operation;
    }else{
        this.previousOperandTextElement.innerText = "";
    }
  }
}

const numbers = document.querySelectorAll("[data-number]");
const operations = document.querySelectorAll("[data-operation]");
const equalsBtn = document.querySelector("[data-equals]");
const deleteBtn = document.querySelector("[data-delete]");
const allClearBtn = document.querySelector("[data-all-clear]");

const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numbers.forEach(number => {
  number.addEventListener("click", function() {
    calculator.appendNumber(number.innerText);
    calculator.updateDisplay();
  });
});

operations.forEach(operation => {
  operation.addEventListener("click", function() {
    calculator.chooseOperation(operation.innerText);
    calculator.updateDisplay();
  });
});

allClearBtn.addEventListener("click", function() {
  calculator.clear();
  calculator.updateDisplay();
});

equalsBtn.addEventListener("click", function() {
  calculator.compute();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", function() {
    calculator.delete();
    calculator.updateDisplay();
  });
