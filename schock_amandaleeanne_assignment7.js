

let balance = 5000;
const annualInterestRate = 0.12;
const monthlyPaymentRate = 0.02;
let monthlyInterestRate = annualInterestRate / 12.0;

for (let month = 0; month < 12; month++) {
    let minimumMonthlyPayment = balance * monthlyPaymentRate;
    let monthlyUnpaidBalance = balance - minimumMonthlyPayment;
    balance = monthlyUnpaidBalance + (monthlyInterestRate * monthlyUnpaidBalance);
}

console.log("Remaining balance:", balance.toFixed(2));
