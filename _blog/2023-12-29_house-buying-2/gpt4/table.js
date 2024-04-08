import { hideIntermediateLines } from "./graph.js";

function div(text, style = "") {
  return `<div class="td-div" style="${style}">${text}</div>`;
}

const YEARS_TO_SHOW = [0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30];

export function createResultsTable() {
  const table = document.createElement("table");
  document.getElementById("resultsTable").appendChild(table);
  const rows = [];
  for (let i = 0; i < 10 + 1; ++i) {
    rows.push(table.insertRow(i));
  }
  rows[0].insertCell(0).innerHTML = div("Year");
  rows[1].insertCell(0).innerHTML = div("Owning Total (Cumulative) ⯈");
  rows[2].insertCell(0).innerHTML = div("Spend", "text-align: left; padding-left: 10px;");
  rows[3].insertCell(0).innerHTML = div("Equity", "text-align: left; padding-left: 10px;");
  rows[4].insertCell(0).innerHTML = div(
    "Investment Spend",
    "text-align: left; padding-left: 10px;"
  );
  rows[5].insertCell(0).innerHTML = div(
    "Investment Equity",
    "text-align: left; padding-left: 10px;"
  );
  rows[6].insertCell(0).innerHTML = div("Renting Total (Cumulative) ⯈");
  rows[7].insertCell(0).innerHTML = div("Spend", "text-align: left; padding-left: 10px;");
  rows[8].insertCell(0).innerHTML = div("Equity", "text-align: left; padding-left: 10px;");
  rows[9].insertCell(0).innerHTML = div(
    "Investment Spend",
    "text-align: left; padding-left: 10px;"
  );
  rows[10].insertCell(0).innerHTML = div(
    "Investment Equity",
    "text-align: left; padding-left: 10px;"
  );
  rows[1].cells[0].addEventListener("click", () => toggleCollapseResultTableRows(2, 5));
  rows[6].cells[0].addEventListener("click", () => toggleCollapseResultTableRows(7, 10));
  rows[1].cells[0].style.cursor = "pointer";
  rows[6].cells[0].style.cursor = "pointer";
  rows[1].style.backgroundColor = "#f0f0f0";
  rows[6].style.backgroundColor = "#f0f0f0";
  toggleCollapseResultTableRows(2, 5);
  toggleCollapseResultTableRows(7, 10);

  for (let year of YEARS_TO_SHOW) {
    rows[0].insertCell(-1).innerHTML = div(year);
    for (let i = 1; i <= 10; ++i) {
      rows[i].insertCell(-1).innerHTML = div("");
    }
  }

  return rows;
}

function diff(obj1, obj2) {
  return Object.keys(obj1).reduce((diff, key) => {
    diff[key] = obj1[key] - obj2[key];
    return diff;
  }, {});
}
function marginalYearly(func, year) {
  return year == 0 ? func(0) : diff(func(year * 12), func((year - 1) * 12));
}
function format(num) {
  return num.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

export function updateResultsTable(rows, owning, renting, investment, cumulative = false) {
  for (let ind = 0; ind < YEARS_TO_SHOW.length; ++ind) {
    const year = YEARS_TO_SHOW[ind];

    const thisOwn = owning(year * 12);
    const thisRent = renting(year * 12);
    const thisInvest = investment(year * 12);
    const own = cumulative ? thisOwn : marginalYearly(owning, year);
    const rent = cumulative ? thisRent : marginalYearly(renting, year);
    const invest = cumulative ? thisInvest : marginalYearly(investment, year);

    rows[1].cells[ind + 1].innerHTML = div(
      format(thisOwn.net + thisInvest.own - thisInvest.ownSpend)
    );
    rows[2].cells[ind + 1].innerHTML = div(format(-own.totalSpent));
    rows[3].cells[ind + 1].innerHTML = div(format(own.totalEquity));
    rows[4].cells[ind + 1].innerHTML = div(format(-invest.ownSpend));
    rows[5].cells[ind + 1].innerHTML = div(format(invest.own));
    rows[6].cells[ind + 1].innerHTML = div(
      format(thisRent.net + thisInvest.rent - thisInvest.rentSpend)
    );
    rows[7].cells[ind + 1].innerHTML = div(format(-rent.totalSpent));
    rows[8].cells[ind + 1].innerHTML = div(format(rent.totalEquity));
    rows[9].cells[ind + 1].innerHTML = div(format(-invest.rentSpend));
    rows[10].cells[ind + 1].innerHTML = div(format(invest.rent));
  }
}

export let rows = createResultsTable();

function toggleCollapseResultTableRows(s, e) {
  const rows = document.getElementById("resultsTable").firstChild.rows;
  const hiddenRows = Array.from(rows)
    .slice(s, e + 1)
    .filter((row) => row.classList.contains("hidden-row"));
  if (hiddenRows.length > 0) {
    for (let row of hiddenRows) {
      row.classList.remove("hidden-row");
    }
    rows[s - 1].firstChild.textContent = rows[s - 1].firstChild.textContent.replace("⯈", "⯆");
    const isOwn = s < 4;
    hideIntermediateLines(false, isOwn);
  } else {
    for (let i = s; i <= e; i++) {
      rows[i].classList.add("hidden-row");
    }
    rows[s - 1].firstChild.textContent = rows[s - 1].firstChild.textContent.replace("⯆", "⯈");
    const isOwn = s < 4;
    hideIntermediateLines(true, isOwn);
  }
}
