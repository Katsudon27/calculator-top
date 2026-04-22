function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function operate(num1, operator, num2){
    switch (operator){
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}

let number1 = "";
let operator = ""; 
let number2 = "";

const digitBtns = document.getElementsByClassName("digit");
const operatorBtns = document.getElementsByClassName("operators");
const equalBtn = document.getElementById("equal-btn");
const clearBtn = document.getElementById("clear-btn");
const decimalBtn = document.getElementById("decimal-btn");
const backspaceBtn = document.getElementById("backspace-btn");

const miniText = document.getElementById("mini-text");
const mainText = document.getElementById("main-text");

let operatorSet = false;
let isEvaluated = false;
let containDecimal = false;

const handleDigitInput = (text) => {
    if (isEvaluated){
        clearDisplay();
    }
    mainText.textContent += text;
}

const handleOperatorInput = (text) => {
    if (parseExpression() === true){
        evaluateExpression(true);
    }

    if (operatorSet === false){
        mainText.textContent += " ";
        mainText.textContent += text;
        mainText.textContent += " ";
        operatorSet = true;
        containDecimal = false;
    }
}

function parseExpression() {
    const values = mainText.textContent.trim().split(" ");
    if (values.length === 3 && !isNaN(values[0]) && !isNaN(values[2])){
        number1 = Number(values[0])

        switch (values[1]){
            case "+":
                operator = "+";
                break;
            case "−":
            case "-":
                operator = "-";
                break;
            case "×":
            case "*":
                operator = "*";
                break;
            case "÷":
                operator = "/";
                break;
        }

        number2 = Number(values[2]);

        if (operator === "/" && number2 === 0){
            clearDisplay();
            alert("ERROR: DIVISION BY ZERO");
            return;
        }

        return true;
    }else{
        return false;
    }
}

function round2Digits(num){
    return Math.round(num * 100) / 100;
}

function evaluateExpression(multiOperator=false){
    miniText.textContent = mainText.textContent;
    if(multiOperator === true){
        number1 = round2Digits(operate(number1, operator, number2));
        mainText.textContent = number1;
        operatorSet = false;
    }else{
        mainText.textContent = round2Digits(operate(number1, operator, number2));
    }
}

function clearDisplay(){
    miniText.textContent = "";
    mainText.textContent = "";
    number1 = "";
    number2 = "";
    operator = "";
    operatorSet = false;
    isEvaluated = false;
}

function addDecimal(text){
    if (containDecimal === false && !isEvaluated){
        mainText.textContent += text;
        containDecimal = true;
    }
}

function handleBackspace(){
    if (!isEvaluated){
        let check = isNaN(mainText.textContent.trim().slice(mainText.textContent.length - 1));
        mainText.textContent = mainText.textContent.slice(0, mainText.textContent.length - 1).trim();
        mainText.textContent += " ";

        if(check){
            operatorSet = false;
        }
    }
}

const handleEqualInput = () => {
    if (parseExpression()){
        evaluateExpression();
        isEvaluated = true;
    }
}

function checkKeyInput(event){
    const isNumber = isFinite(event.key) && event.key !== ' ';

    if (isNumber){
        handleDigitInput(event.key);
    }else{
        switch (event.key){
            case "+":
            case "-":
            case "*":
            case "/":
                handleOperatorInput(event.key);
                break;
            case "Enter":
                handleEqualInput();
                break;
            case ".":
                addDecimal(event.key);
                break;
            case "Backspace":
                handleBackspace();
                break;
            case "Delete":
                clearDisplay();
                break;
        }
    }
}

Array.prototype.forEach.call(digitBtns, function(digitBtn) {
    digitBtn.addEventListener("click", () => {
        handleDigitInput(digitBtn.textContent);
    });
});

Array.prototype.forEach.call(operatorBtns, function(operatorBtn) {
    operatorBtn.addEventListener("click", () => {
        handleOperatorInput(operatorBtn.textContent);
    });
});

equalBtn.addEventListener("click", () => {
    handleEqualInput();
})

clearBtn.addEventListener("click", () => {
    clearDisplay();
})

decimalBtn.addEventListener("click", () => {
    addDecimal(decimalBtn.textContent);
})

backspaceBtn.addEventListener("click", () => {
    handleBackspace();
})