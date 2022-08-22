let shouldResetScreen = false;
let firstOperand = '';
let secondOperand = '';
let currentOperand = null;

const lastScreen = document.getElementById('last-screen');
const currentScreen = document.getElementById('current-screen')
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const numberBtn = document.querySelectorAll('[data-number]')
const operatorBtn = document.querySelectorAll('[data-operator]');
const decimal = document.getElementById('decimal');
const equals = document.getElementById('equals');

// ADD EVENT LISTENERS
clearBtn.addEventListener('click', clearScreen);
deleteBtn.addEventListener('click', deleteNumber);
decimal.addEventListener('click', insertDecimal)
equals.addEventListener('click', giveResult);
document.addEventListener('keydown', keyboardInput);

numberBtn.forEach((number) => {
    number.addEventListener('click', () => joinNumber(number.textContent))
})

operatorBtn.forEach((operator) => {
    operator.addEventListener('click', () => setOperation(operator.textContent))
})

// JOIN NEXT NUMBER
function joinNumber(number) {
    if(currentScreen.textContent === '0' || shouldResetScreen)
        resetScreen();
        currentScreen.textContent += number;

    if(currentScreen.textContent.length > 15){
        alert("You've reached the maximum number length")
        deleteNumber()
    }
};

// CLEAR/REMOVE NUMBERS
function resetScreen() {
    currentScreen.textContent = '';
    shouldResetScreen = false;
};

function clearScreen() {
    lastScreen.textContent = '';
    currentScreen.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    currentOperand = null;
};

function deleteNumber() {
    currentScreen.textContent = currentScreen.textContent.toString().slice(0, -1);
    
    if(currentScreen.textContent.length === 0) {
        currentScreen.textContent = '0'
    }
};

// SET THE OPERATION
function setOperation(operator) {
    if(currentOperand !== null) giveResult();
        
    firstOperand = currentScreen.textContent;
    currentOperand = operator;
    lastScreen.textContent = `${firstOperand} ${currentOperand}`
    shouldResetScreen = true
};

// INSERT DECIMAL
function insertDecimal() {
    if(shouldResetScreen) resetScreen();

    if(currentScreen.textContent === '') {
        currentScreen.textContent = '0'
    }

    if(currentScreen.textContent.includes('.')) return
    currentScreen.textContent += '.'
};

// GET RESULT
function giveResult() {
    if(currentOperand === null || shouldResetScreen) return
    
    if(currentOperand === '/' && currentScreen.textContent === '0') {
        alert("Trying to divide by zero are we?");
        return
    }

    secondOperand = currentScreen.textContent
    currentScreen.textContent = roundResult(mathOperation(currentOperand, firstOperand, secondOperand))
    currentOperand = null
};

function roundResult(number) {
    return Math.floor(number * 1000) / 1000;
};

// MATH OPERATIONS
function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function mathOperation(operator, a, b) {
    a = Number(a);
    b = Number(b);

    switch(operator) {
        case '+':
            return add(a, b)
        
        case '-':
            return subtract(a, b)

        case 'x':
            return multiply(a, b)

        case '/':
            if(b === 0) {
                return null
            }
            else {
                return divide(a, b)
            }
            
        default:
            return null;
    };
};

// KEYBOARD FUNCTIONALITY
function keyboardInput(e) {
    if(e.key >= 0 || e.key <= 9) {
        joinNumber(e.key);
    }

    if(e.key === '+' || e.key === '-' || e.key === 'x' || e.key === '/') {
        setOperation(e.key);
    }
    
    if(e.key === 'Escape') {
        clearScreen();
    }

    if(e.key === 'Delete' || e.key === 'Backspace') {
        deleteNumber();
    }

    if(e.key === 'Enter') {
        giveResult();
    }
};

// THEME TOGGLER
const body = document.querySelector('body')
const toggleTheme = document.getElementById('toggle-theme')
const sun = document.getElementById('sun')
const moon = document.getElementById('moon')
const lightText = document.getElementById('light-text')
const darkText = document.getElementById('dark-text')

toggleTheme.addEventListener('click', () => {
    body.classList.toggle('dark')
    sun.classList.toggle('show')
    moon.classList.toggle('hide')
    lightText.classList.toggle('show')
    darkText.classList.toggle('hide')
})