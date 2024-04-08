function createGraph(timeHorizon) {
  const T = timeHorizon;
  const ctx = document.getElementById("costGraph").getContext("2d");

  // 0, 1, ..., T
  // linspace continuous t = [0, T] with 3600 points
  const t = Array.from({ length: T * 12 + 1 }, (_, i) => i / 12);

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: t,
      datasets: [
        {
          label: "Owning",
          data: t,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          pointRadius: 0, // No dots on the line
        },
        {
          label: "Renting",
          data: t,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          pointRadius: 0, // No dots on the line
        },
        {
          label: "Owning Costs",
          data: t,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          borderDash: [5, 5],
          pointRadius: 0, // No dots on the line
        },
        {
          label: "Renting Costs",
          data: t,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          borderDash: [5, 5],
          pointRadius: 0, // No dots on the line
        },
        {
          label: "Owning Equity",
          data: t,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          borderDash: [1, 1],
          pointRadius: 0, // No dots on the line
        },
        {
          label: "Renting Equity",
          data: t,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          borderDash: [1, 1],
          pointRadius: 0, // No dots on the line
        },
        {
          label: "Owning Investment",
          data: t,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          borderDash: [2, 2],
          pointRadius: 0, // No dots on the line
        },
        {
          label: "Renting Investment",
          data: t,
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

  return myChart;
}

export let myChart = createGraph(30);

window.myChart = myChart;

function negative(arr) {
  return arr.map((x) => -x);
}

export function updateGraph(owning, renting, addInvestmentReturn) {
  console.log("updateGraph");

  const t = myChart.data.labels;
  const m = t.map((t_) => 12 * t_);

  const own = {
    costs: m.map((i) => owning(i).totalSpent),
    equity: m.map((i) => owning(i).totalEquity),
    investment: m.map((i) => addInvestmentReturn(i).own - addInvestmentReturn(i).ownSpend),
    total: m.map(
      (i) => owning(i).net + addInvestmentReturn(i).own - addInvestmentReturn(i).ownSpend
    ),
  };
  const rent = {
    costs: m.map((i) => renting(i).totalSpent),
    equity: m.map((i) => renting(i).totalEquity),
    investment: m.map((i) => addInvestmentReturn(i).rent - addInvestmentReturn(i).rentSpend),
    total: m.map(
      (i) => renting(i).net + addInvestmentReturn(i).rent - addInvestmentReturn(i).rentSpend
    ),
  };

  const datas = {
    Owning: negative(own.total),
    Renting: negative(rent.total),
    "Owning Costs": own.costs,
    "Renting Costs": rent.costs,
    "Owning Equity": negative(own.equity),
    "Renting Equity": negative(rent.equity),
    "Owning Investment": negative(own.investment),
    "Renting Investment": negative(rent.investment),
  };

  for (let dataset of myChart.data.datasets) {
    dataset.data = datas[dataset.label];
  }

  myChart.update();
}

export function hideIntermediateLines(hide = true, isOwn = true) {
  if (!myChart) {
    setTimeout(() => hideIntermediateLines(hide, isOwn), 100);
    return;
  }
  const data = myChart.data.datasets;
  for (let i = isOwn ? 2 : 3; i < data.length; i += 2) {
    data[i].hidden = hide;
  }
  myChart.update();
}
