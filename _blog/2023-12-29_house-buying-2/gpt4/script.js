import { calculate } from "./calculate.js";
import { createResultsTable } from "./table.js";
import { myChart } from "./graph.js";
import { rows } from "./table.js";

// Event listener for time horizon slider
// document.getElementById("timeHorizon").addEventListener("input", function () {
//   document.getElementById("timeHorizonValue").textContent = this.value;
// });

// Initial calculation
calculate();

window.calculate = calculate;

function updateSliderLabel(input) {
  console.log(input.id + "Label");
  const slider = document.getElementById(input.id);
  if (slider.type == "range") {
    const label = document.getElementById(input.id + "Label");
    label.value = slider.value;
  }
}

function updateInputNumber(input) {
  const slider = document.getElementById(input.id.slice(0, -5));
  slider.value = input.value;
}

const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  if (input.type == "range") {
    input.addEventListener("input", () => updateSliderLabel(input));
    updateSliderLabel(input);
    input.addEventListener("input", calculate);
  } else if (input.type == "number") {
    input.addEventListener("input", () => {
      updateInputNumber(input);
      calculate();
    });
    updateInputNumber(input);
  } else if (input.type == "checkbox") {
    input.addEventListener("input", calculate);
  }
});
