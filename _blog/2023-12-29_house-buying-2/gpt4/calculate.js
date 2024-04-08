import { updateResultsTable, rows } from "./table.js";
import { updateGraph } from "./graph.js";

export function calculate() {
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

  const cumulative = !document.getElementById("cumulative").checked;

  // Update table with results
  updateResultsTable(rows, OwnCosts, RentCosts, addInvestmentReturn, cumulative);

  // Update graph
  updateGraph(OwnCosts, RentCosts, addInvestmentReturn);
}
