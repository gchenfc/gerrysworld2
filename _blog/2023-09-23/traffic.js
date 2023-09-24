import { renderCalendar } from "./calendar.js";

/// Create a smooth colormap from red to transparent to green
function colorScale(value, min, max) {
  const f_ = 1 - (value - min) / (max - min);
  const f = Math.min(Math.max(f_, 0), 1);
  if (f < 0.5) {
    const t = f * 2;
    return `rgba(255, ${255 * t}, ${128 * t}, ${1 - t * 0.8})`;
  } else {
    const t = (1 - f) * 2;
    return `rgba(${255 * t}, 255, ${128 * t}, ${1 - t * 0.8})`;
  }
}

function setColorbar(min, max) {
  const root = document.getElementById("shadowHost").shadowRoot;
  for (const elem of root.querySelectorAll(".colorbar")) {
    // Define the number of steps in the gradient
    const steps = 100;
    let gradient = "linear-gradient(to right";
    for (let i = 0; i <= steps; i++) {
      const value = i / steps;
      gradient += `, ${colorScale(value, 0, 1)} ${value * 100}%`;
    }
    gradient += ")";

    elem.style.background = gradient;
    // elem.style.background = `linear-gradient(to right, ${colorScale(0, 0, 1)}, ${colorScale(1, 0, 1)})`;

    elem.setAttribute(
      "data-before",
      (min / 1000000).toFixed(2) + "M (least busy)"
    );
    elem.setAttribute(
      "data-after",
      (max / 1000000).toFixed(2) + "M (most busy)"
    );
  }
}

/// This function is necessary because TSA data is matched by day of the week instead of by date,
/// so e.g. Jan 1, 2023 is a Sunday which should correspond with Jan 2, 2022.
function correctDate(year, month, date, currYear) {
  const currDate = new Date(currYear, month - 1, date);
  const day = currDate.getDay();
  const dayDiff = (day - new Date(year, month - 1, date).getDay() + 7) % 7;
  return new Date(year, month - 1, currDate.getDate() + dayDiff);
}

window.artificial_min = 0;

function parseTsv(content) {
  const root = document.getElementById("shadowHost").shadowRoot;
  const rows = content.split("\n"); // Split by rows

  // First parse the lowest and highest numbers
  let min = Number.MAX_SAFE_INTEGER,
    max = Number.MIN_SAFE_INTEGER;

  for (const row of rows.slice(1)) {
    const columns = row.split("\t"); // Split by tab
    for (const column of columns.slice(1)) {
      const number = parseInt(column.replace(/,/g, ""), 10);
      if (isNaN(number)) continue;
      min = Math.min(min, number);
      max = Math.max(max, number);
    }
  }

  console.log("The min traffic is ", min, " and the max traffic is ", max);
  min = Math.max(min, window.artificial_min); // Make sure min is at least 1500000 because pandemic traffic is low
  setColorbar(min, max);

  const header = rows[0].split("\t"); // Split by tab
  for (const row of rows.slice(1)) {
    const columns = row.split("\t"); // Split by tab
    const date = columns[0];
    // turn format 9/16/2023 to _2023-9-16
    const day = date.split("/")[1];
    const month = date.split("/")[0];
    const currYear = date.split("/")[2];

    for (let coli = 1; coli < columns.length; coli++) {
      if (columns[coli] === "") continue; // Data missing

      const year = header[coli];
      const newDate = correctDate(year, month, day, currYear);

      const elem_id = `_${year}-${newDate.getMonth() + 1}-${newDate.getDate()}`;
      const elem = root.getElementById(elem_id);
      const elems = root.querySelectorAll(`#${elem_id}`);
      for (const elem of elems) {
      if (!elem) continue; // Not a day in the calendar
        const number = parseInt(columns[coli].replace(/,/g, ""), 10);
        const color = colorScale(number, min, max);
        const numberStr = (number / 1000000).toFixed(2) + "M"; // Convert number to 1.23M

        elem.style.backgroundColor = color;
        elem.setAttribute("data-after", numberStr);
      }
    }
  }
}

let content = ""; // THE TSV DATA
function update_calendar() {
  parseTsv(content);
}

// function readFile(event) {
//   const file = event.target.files[0];

//   if (!file) {
//     console.log("No file selected");
//     return;
//   }

//   const reader = new FileReader();

//   reader.onload = function (e) {
//     parseTsv(e.target.result);
//   };

//   reader.readAsText(file);
// }

// document.getElementById("trafficFile").addEventListener("change", readFile);

async function readClipboard() {
  try {
    // Check if clipboard read permission is available or request it
    const permissionStatus = await navigator.permissions.query({
      name: "clipboard-read",
    });
    if (
      permissionStatus.state === "granted" ||
      permissionStatus.state === "prompt"
    ) {
      // Read the clipboard content
      content = await navigator.clipboard.readText();

      if (!content.startsWith("Date\t")) {
        let s =
          "Clipboard content does not match expected.  Expected:\n\nDate\t2023\t2022\t...\n\nGot:\n\n" +
          content;
        alert(s);
      }
      console.log(content);
      // Call the parseTsv function with the clipboard content
      renderCalendar();
    } else {
      alert("Clipboard permission denied");
    }
  } catch (err) {
    alert("Failed to read clipboard content:", err);
  }
}

document
  .getElementById("parseClipboard")
  .addEventListener("click", readClipboard);

async function fetchAndReadFile() {
  try {
    // Fetch the file from the relative URL
    const response = await fetch("dates.tsv");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Read the file content as text
    content = await response.text();
    renderCalendar();
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

// Fetch and read file after dom is loaded
// document.addEventListener("DOMContentLoaded", fetchAndReadFile);

export { update_calendar, fetchAndReadFile };
