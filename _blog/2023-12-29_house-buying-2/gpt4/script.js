let myChart = null;

function calculate() {
  // Getting input values
  const V = parseFloat(document.getElementById("houseValue").value);
  const D = parseFloat(document.getElementById("downPayment").value) / 100;
  const Ri = parseFloat(document.getElementById("mortgageRate").value) / 100;
  const A = parseFloat(document.getElementById("closingPct").value) / 100;
  const PC = parseFloat(document.getElementById("maintenancePct").value) / 100;
  const Rl = parseFloat(document.getElementById("annualRentPct").value) / 100;
  const Ra = parseFloat(document.getElementById("realEstateAppreciation").value) / 100;
  const Rm = parseFloat(document.getElementById("investmentReturn").value) / 100;
  const T = 30;

  // Calculations

  function m(ri) {
    return (ri * Math.pow(1 + ri, 360)) / (Math.pow(1 + ri, 360) - 1);
  }
  function p(M, ri) {
    return (
      Math.pow(1 + ri, M) -
      ((Math.pow(1 + ri, M) - 1) / (Math.pow(1 + ri, 360) - 1)) * Math.pow(1 + ri, 360)
    );
  }
  function OwnCosts(M) {
    const T = M / 12;

    const downPayment = V * D;
    const closingCosts = V * A;
    const principle = V * (1 - D);

    const mortgageMonthlyProp = m(Ri / 12);
    const mortgageMonthly = mortgageMonthlyProp * principle;
    const maintenanceAnnual = V * PC;

    const upfrontCosts = downPayment + closingCosts;
    const ongoingCosts = mortgageMonthly * 12 + maintenanceAnnual;

    const totalEquity = V * Math.pow(1 + Ra, T) * (1 - A) - p(M, Ri / 12) * principle;
    const totalSpent = upfrontCosts + ongoingCosts * T;

    const net = totalEquity - totalSpent;

    return {
      upfrontCosts,
      ongoingCosts,
      totalEquity,
      totalSpent,
      net,
    };
  }

  function RentCosts(M) {
    const T = M / 12;

    const rentMonthly = (V * Rl) / 12;

    const upfrontCosts = 0;
    const ongoingCosts = rentMonthly * 12;

    const totalEquity = 0;
    const totalSpent = upfrontCosts + ongoingCosts * T;

    const net = totalEquity - totalSpent;

    return {
      upfrontCosts,
      ongoingCosts,
      totalEquity,
      totalSpent,
      net,
    };
  }

  function addInvestmentReturn(M) {
    let own = 0,
      ownSpend = 0;
    let rent = 0,
      rentSpend = 0;
    const costAtI = (obj, i) => (i == 0 ? obj.upfrontCosts : obj.ongoingCosts / 12);
    for (let i = 0; i <= M; i++) {
      const own1 = costAtI(OwnCosts(i), i);
      const rent1 = costAtI(RentCosts(i), i);
      ownSpend += Math.max(own1, rent1) - own1;
      rentSpend += Math.max(own1, rent1) - rent1;
      own += (Math.max(own1, rent1) - own1) * Math.pow(1 + Rm, (M - i) / 12);
      rent += (Math.max(own1, rent1) - rent1) * Math.pow(1 + Rm, (M - i) / 12);
    }
    return { own, rent, ownSpend, rentSpend };
  }

  // Update table with results
  updateResultsTable(T, OwnCosts, RentCosts, addInvestmentReturn);

  // Update graph
  updateGraph(T, OwnCosts, RentCosts, addInvestmentReturn);
}

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
    hideIntermediateLines(false);
  } else {
    for (let i = s; i <= e; i++) {
      rows[i].classList.add("hidden-row");
    }
    rows[s - 1].firstChild.textContent = rows[s - 1].firstChild.textContent.replace("⯆", "⯈");
    hideIntermediateLines(true);
  }
}

function updateResultsTable(timeHorizon, owning, renting, investment, cumulative = false) {
  const T = timeHorizon;

  const table = document.createElement("table");
  document.getElementById("resultsTable").appendChild(table);

  const rows = [];
  for (let i = 0; i < 10 + 1; ++i) {
    rows.push(table.insertRow(i));
  }

  function div(text, style = "") {
    return `<div class="td-div" style="${style}">${text}</div>`;
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

  for (let row of rows) {
    row.cells[0].tagName = "TH";
  }

  let prevOwn = {
    upfrontCosts: 0,
    ongoingCosts: 0,
    totalEquity: 0,
    totalSpent: 0,
    net: 0,
  };
  let prevRent = {
    upfrontCosts: 0,
    ongoingCosts: 0,
    totalEquity: 0,
    totalSpent: 0,
    net: 0,
  };
  let prevInvest = {
    own: 0,
    rent: 0,
    ownSpend: 0,
    rentSpend: 0,
  };
  function diff(obj1, obj2) {
    return Object.keys(obj1).reduce((diff, key) => {
      diff[key] = obj1[key] - obj2[key];
      return diff;
    }, {});
  }
  function format(num) {
    // return num.toFixed(2);
    return num.toLocaleString(undefined, { style: "currency", currency: "USD" });
  }
  let own, rent, invest;
  for (let year = 0; year <= T; ++year) {
    const thisOwn = owning(year * 12);
    const thisRent = renting(year * 12);
    const thisInvest = investment(year * 12);
    if (cumulative) {
      own = thisOwn;
      rent = thisRent;
      invest = thisInvest;
    } else {
      own = diff(thisOwn, prevOwn);
      rent = diff(thisRent, prevRent);
      invest = diff(thisInvest, prevInvest);
      prevOwn = thisOwn;
      prevRent = thisRent;
      prevInvest = thisInvest;
    }
    rows[0].insertCell(-1).innerHTML = div(year);
    rows[1].insertCell(-1).innerHTML = div(
      format(thisOwn.net + thisInvest.own - thisInvest.ownSpend)
    );
    rows[2].insertCell(-1).innerHTML = div(format(-own.totalSpent));
    rows[3].insertCell(-1).innerHTML = div(format(own.totalEquity));
    rows[4].insertCell(-1).innerHTML = div(format(-invest.ownSpend));
    rows[5].insertCell(-1).innerHTML = div(format(invest.own));
    rows[6].insertCell(-1).innerHTML = div(
      format(thisRent.net + thisInvest.rent - thisInvest.rentSpend)
    );
    rows[7].insertCell(-1).innerHTML = div(format(-rent.totalSpent));
    rows[8].insertCell(-1).innerHTML = div(format(rent.totalEquity));
    rows[9].insertCell(-1).innerHTML = div(format(-invest.rentSpend));
    rows[10].insertCell(-1).innerHTML = div(format(invest.rent));
  }

  const colsToKeep = [-1, 0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30];
  for (let row of rows) {
    for (let i = row.cells.length - 1; i >= 0; --i) {
      if (!colsToKeep.includes(i - 1)) {
        row.deleteCell(i);
      }
    }
  }
}

function updateGraph(timeHorizon, owning, renting, addInvestmenReturn) {
  const T = timeHorizon;
  const ctx = document.getElementById("costGraph").getContext("2d");

  // 0, 1, ..., T
  // linspace continuous t = [0, T] with 3600 points
  const t = Array.from({ length: T * 12 + 1 }, (_, i) => i / 12);
  const m = t.map((t_) => 12 * t_);

  const own = {
    costs: m.map((i) => owning(i).totalSpent),
    equity: m.map((i) => owning(i).totalEquity),
    investment: m.map((i) => addInvestmenReturn(i).own - addInvestmenReturn(i).ownSpend),
    total: m.map((i) => owning(i).net + addInvestmenReturn(i).own - addInvestmenReturn(i).ownSpend),
  };
  const rent = {
    costs: m.map((i) => renting(i).totalSpent),
    equity: m.map((i) => renting(i).totalEquity),
    investment: m.map((i) => addInvestmenReturn(i).rent - addInvestmenReturn(i).rentSpend),
    total: m.map(
      (i) => renting(i).net + addInvestmenReturn(i).rent - addInvestmenReturn(i).rentSpend
    ),
  };

  function negative(arr) {
    return arr.map((x) => -x);
  }

  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: t,
      datasets: [
        {
          label: "Owning",
          data: negative(own.total),
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          pointRadius: 0, // No dots on the line
        },
        {
          label: "Renting",
          data: negative(rent.total),
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          pointRadius: 0, // No dots on the line
        },
        {
          label: "Owning Costs",
          data: own.costs,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          borderDash: [5, 5],
          pointRadius: 0, // No dots on the line
        },
        {
          label: "Renting Costs",
          data: rent.costs,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          borderDash: [5, 5],
          pointRadius: 0, // No dots on the line
        },
        {
          label: "Owning Equity",
          data: negative(own.equity),
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          borderDash: [1, 1],
          pointRadius: 0, // No dots on the line
        },
        {
          label: "Renting Equity",
          data: negative(rent.equity),
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          borderDash: [1, 1],
          pointRadius: 0, // No dots on the line
        },
        {
          label: "Owning Investment",
          data: negative(own.investment),
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          borderDash: [2, 2],
          pointRadius: 0, // No dots on the line
        },
        {
          label: "Renting Investment",
          data: negative(rent.investment),
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          borderDash: [2, 2],
          pointRadius: 0, // No dots on the line
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        axis: "x",
        intersect: false, // Ensure that the tooltip appears when hovering anywhere on the x-axis
      },
      tooltips: {
        mode: "index", // Show tooltip for all datasets
        intersect: false, // Ensure that the tooltip appears when hovering anywhere on the x-axis
      },
      scales: {
        x: {
          ticks: {
            maxTicksLimit: 31,
          },
        },
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
    },
  });
}

function hideIntermediateLines(hide=true) {
  if (!myChart) {
    setTimeout(() => hideIntermediateLines(hide), 100);
    return;
  }
  const data = myChart.data.datasets;
  for (let i = 2; i < data.length; i++) {
    data[i].hidden = hide;
  }
  myChart.update();
}

// Event listener for time horizon slider
// document.getElementById("timeHorizon").addEventListener("input", function () {
//   document.getElementById("timeHorizonValue").textContent = this.value;
// });

// Initial calculation
calculate();
