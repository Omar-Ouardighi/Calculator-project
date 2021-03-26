const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0 ;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
    // Replace current display value if first value is entered
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue= false ;
    } else{
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
    
};

function addDecimal() {
    // if operator is pressed, dont add decimal
    if (awaitingNextValue) return;
    // if no decimal, add one
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

// Calculating
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber ,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber ,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber ,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber ,
    '=': (firstNumber, secondNumber) => secondNumber ,
}

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // prevent multiple operators
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    } 
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue,currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    awaitingNextValue = true;
    operatorValue = operator;
}

// add eventListener
inputBtns.forEach((inputbtn) => {
    if (inputbtn.classList.length == 0) {
        inputbtn.addEventListener('click', () => sendNumberValue(inputbtn.value));
    } else if (inputbtn.classList.contains('operator')) {
        inputbtn.addEventListener('click', () => useOperator(inputbtn.value));
    } else if (inputbtn.classList.contains('decimal')) {
        inputbtn.addEventListener('click',() => addDecimal()); }
});

// reset
function resetAll() {
    firstValue = 0 ;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0'
}

clearBtn.addEventListener('click', resetAll);