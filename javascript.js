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

let number1, operator, number2;

const digitBtns = document.getElementsByClassName("digit");
const operatorBtns = document.getElementsByClassName("operators");
const equalBtn = document.getElementById("equal-btn");
const clearBtn = document.getElementById("clear-btn");

const miniText = document.getElementById("mini-text");
const mainText = document.getElementById("main-text");

const handleDigitInput = (text) => {
    mainText.textContent += text;
}

const handleOperatorInput = (text) => {
    if (parseExpression() === true){
        evaluateExpression(true);
    }
    mainText.textContent += " ";
    mainText.textContent += text;
    mainText.textContent += " ";
}

function parseExpression() {
    const values = mainText.textContent.split(" ");
    if (Number(values[0]) && Number(values[2])){
        number1 = Number(values[0])

        switch (values[1]){
            case "+":
                operator = "+";
                break;
            case "−":
                operator = "-";
                break;
            case "×":
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
}

const handleEqualInput = () => {
    parseExpression();
    evaluateExpression();
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