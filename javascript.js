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
const mainText = document.getElementById("main-text");

const handleDigitInput = (text) => {
    mainText.textContent = text;
}

Array.prototype.forEach.call(digitBtns, function(digitBtn) {
    digitBtn.addEventListener("click", () => {
        handleDigitInput(digitBtn.textContent);
    });
});