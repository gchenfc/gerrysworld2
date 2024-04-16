function calculateMortgagePayment(principal, interestRate, years) {
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = years * 12;
  const payment = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  return payment;
}

function calculateCosts() {
  const houseValue = parseFloat(document.getElementById('house-value').value);
  const downPaymentPercentage = parseFloat(document.getElementById('down-payment').value);
  const mortgageRate = parseFloat(document.getElementById('mortgage-rate').value);
  const rentalCostPercentage = parseFloat(document.getElementById('rental-cost').value);
  const investmentReturn = parseFloat(document.getElementById('investment-return').value);
  const timeHorizon = parseInt(document.getElementById('time-horizon').value);

  const downPayment = houseValue * (downPaymentPercentage / 100);
  const mortgageAmount = houseValue - downPayment;
  const monthlyMortgagePayment = calculateMortgagePayment(mortgageAmount, mortgageRate, 30);
  const totalMortgagePayments = monthlyMortgagePayment * 12 * timeHorizon;
  const additionalCosts = houseValue * 0.01 * timeHorizon;
  const opportunityCost = downPayment * (Math.pow(1 + (investmentReturn / 100), timeHorizon) - 1);
  const totalOwningCost = downPayment + totalMortgagePayments + additionalCosts + opportunityCost;

  const annualRentalCost = houseValue * (rentalCostPercentage / 100);
  const totalRentalPayments = annualRentalCost * timeHorizon;
  const opportunityGain = downPayment * (Math.pow(1 + (investmentReturn / 100), timeHorizon) - 1);
  const totalRentingCost = totalRentalPayments - opportunityGain;

  const table = document.getElementById('calculation-table');
  table.innerHTML = `
    <tr>
      <th></th>
      <th>Down Payment</th>
      <th>Mortgage/Rental Payments</th>
      <th>Additional Costs</th>
      <th>Opportunity Cost/Gain</th>
      <th>Total Cost</th>
    </tr>
    <tr>
      <td>Owning</td>
      <td>${downPayment.toFixed(2)}</td>
      <td>${totalMortgagePayments.toFixed(2)}</td>
      <td>${additionalCosts.toFixed(2)}</td>
      <td>${opportunityCost.toFixed(2)}</td>
      <td>${totalOwningCost.toFixed(2)}</td>
    </tr>
    <tr>
      <td>Renting</td>
      <td>-</td>
      <td>${totalRentalPayments.toFixed(2)}</td>
      <td>-</td>
      <td>${opportunityGain.toFixed(2)}</td>
      <td>${totalRentingCost.toFixed(2)}</td>
    </tr>
  `;

  const costData = {
    labels: Array.from({ length: timeHorizon }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Owning Cost',
        data: Array.from({ length: timeHorizon }, (_, i) => {
          const year = i + 1;
          const mortgagePayments = monthlyMortgagePayment * 12 * year;
          const additionalCostsYear = houseValue * 0.01 * year;
          const opportunityCostYear = downPayment * (Math.pow(1 + (investmentReturn / 100), year) - 1);
          return downPayment + mortgagePayments + additionalCostsYear + opportunityCostYear;
        }),
        borderColor: 'blue',
        fill: false
      },
      {
        label: 'Renting Cost',
        data: Array.from({ length: timeHorizon }, (_, i) => {
          const year = i + 1;
          const rentalPayments = annualRentalCost * year;
          const opportunityGainYear = downPayment * (Math.pow(1 + (investmentReturn / 100), year) - 1);
          return rentalPayments - opportunityGainYear;
        }),
        borderColor: 'green',
        fill: false
      }
    ]
  };

  const ctx = document.getElementById('cost-chart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: costData,
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Time Horizon (Years)'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Cost'
          }
        }
      }
    }
  });
}

document.getElementById('time-horizon').addEventListener('input', function() {
  document.getElementById('time-horizon-value').textContent = this.value;
});