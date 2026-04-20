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

const miniText = document.getElementById("mini-text");
const mainText = document.getElementById("main-text");

const handleDigitInput = (text) => {
    mainText.textContent += text;
}

const handleOperatorInput = (text) => {
    mainText.textContent += " ";
    mainText.textContent += text;
    mainText.textContent += " ";
}

const handleEqualInput = () => {
    miniText.textContent = mainText.textContent;
    const values = mainText.textContent.split(" ");
    number1 = Number(values[0]);
    console.log(values[1]);

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
    console.log(number1);
    console.log(number2);
    console.log(operator);
    mainText.textContent = operate(number1, operator, number2);
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