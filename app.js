const all_clear_button = document.querySelector("[data-all_clear]");
const delete_button = document.querySelector("[data-delete]");
const equals_button = document.querySelector("[data-equals]");
const prev_operand_text = document.querySelector("[data-prev_operand]");
const current_operand_text = document.querySelector("[data-current_operand]");

const [...numbers_button] = document.querySelectorAll("[data-number]");
const [...operations_button] = document.querySelectorAll("[data-operation]");

class Calculator {
  constructor(prev_operand_text, current_operand_text) {
    this.prev_operand_text = prev_operand_text;
    this.current_operand_text = current_operand_text;
    this.clear();
  }

  clear() {
    this.prev_operand = "";
    this.current_operand = "0";
    this.operation = undefined;
  }
  delete() {
    if (this.current_operand.length <= 1) {
      return (this.current_operand = "0");
    } else {
      this.current_operand = this.current_operand.toString().slice(0, -1);
    }
  }

  appendNumber(number) {
    if (number === "." && this.current_operand.includes(".")) return;
    this.current_operand = this.current_operand.toString() + number.toString();
  }
  operationNumber(operation) {
    if (this.current_operand == "") return;
    if (this.prev_operand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.prev_operand = this.current_operand;
    this.current_operand = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.prev_operand);
    const curr = parseFloat(this.current_operand);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "x":
        computation = prev * curr;
        break;
      case "÷":
        computation = prev / curr;
        break;

      default:
        return;
    }

    this.current_operand = computation;
    this.operation = undefined;
    this.prev_operand = "";
  }

  getDisplayNumber(number) {
    // const floatNumber = parseFloat(number);
    // if (isNaN(floatNumber)) return "";
    // return floatNumber.toLocaleString("en");

    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.current_operand_text.innerText = this.getDisplayNumber(
      this.current_operand
    );
    if (this.operation != null) {
      this.prev_operand_text.innerText = `${this.getDisplayNumber(
        this.prev_operand
      )} ${this.operation}`;
    } else {
      this.prev_operand_text.innerText = this.prev_operand;
    }
  }
}

const calculator = new Calculator(prev_operand_text, current_operand_text);

numbers_button.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operations_button.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.operationNumber(button.innerText);
    calculator.updateDisplay();
  });
});

equals_button.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

all_clear_button.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

delete_button.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
