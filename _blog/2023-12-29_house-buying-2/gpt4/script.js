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

const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("input", calculate);
});
