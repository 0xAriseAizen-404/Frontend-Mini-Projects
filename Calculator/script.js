const screenDisplay = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");
let calculation = [];
let accumulativeCalculation;

function calculate(button) {
  const value = button.textContent;
  if (value == "CLR") {
    calculation = [];
    screenDisplay.textContent = "0";
  } else if (value == "=") {
    try {
      screenDisplay.textContent = eval(accumulativeCalculation);
      calculation = [];
      accumulativeCalculation = "";
    } catch (err) {
      screenDisplay.textContent = "Invalid Expression";
    }
  } else if (value == "BS") {
    calculation = calculation.slice(0, -1);
    accumulativeCalculation = accumulativeCalculation.slice(0, -1);
    screenDisplay.textContent = accumulativeCalculation;
  } else {
    calculation.push(value);
    accumulativeCalculation = calculation.join("");
    screenDisplay.textContent = accumulativeCalculation;
  }
}
buttons.forEach((button) =>
  button.addEventListener("click", () => calculate(button))
);
