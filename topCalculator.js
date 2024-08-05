const display = document.getElementById("display");
const operators = document.querySelectorAll(".operators");
const numbers = document.querySelectorAll(".number");
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');

let firstNumber;
let secondNumber;
let mathOperator;
let total;

function appendToDisplay(input){
    if (input === '.' && display.value.includes('.')) return;
    display.value += input;
};

function clearDisplay(){
    display.value = "";
    firstNumber = '';
    secondNumber = '';
    mathOperator = '';
    total = 0;
};

function add(a, b){
    return a + b;
};

function subtract(a, b){
    return a - b;
};

function multiply(a, b){
    return a * b;
};

function divide(a, b){
    if (b === 0){
        display.value = "Error, can't divide by zero."
        return null;
    }
    else{
        return a / b;
    }
};

function operate(mathOperator, firstNumber , secondNumber){
    let num1 = parseFloat(firstNumber);
    let num2 = parseFloat(secondNumber);

    if (isNaN(num1) || isNaN(num2)) {
        display.value = "Error";
        return;
    }

    switch (mathOperator) {
        case '+':
            total = add(num1, num2);
            break;
        case '-':
            total = subtract(num1, num2);
            break;
        case '*':
            total = multiply(num1, num2);
            break;
        case '/':
            total = divide(num1, num2);
            break;
        default:
            display.value = "Error";
            return;
    }
    
    if (total !== null) {
        display.value = total;
        firstNumber = total.toString();
    }
};

numbers.forEach(button => {
    button.addEventListener('click', () => {
        appendToDisplay(button.getAttribute('data-value'));
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (mathOperator && firstNumber) {
            secondNumber = display.value;
            operate(mathOperator, firstNumber, secondNumber);
            firstNumber = display.value;
            secondNumber = '';
        } else {
            firstNumber = display.value;
            display.value = '';
        }
        mathOperator = operator.getAttribute('data-operator');
    });
});

equals.addEventListener('click', () => {
    if (mathOperator && firstNumber) {
        secondNumber = display.value;
        operate(mathOperator, firstNumber, secondNumber);
        mathOperator = '';
        secondNumber = '';
    }
});

clear.addEventListener("click", clearDisplay);