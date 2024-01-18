

function minPayment(balance, interest){

    const monthlyInterestRate = interest/12.0;
    let remainingBalance = 10;
    let unpaidBalance = 0;

    let monthlyPayment = 0;
    
    while (remainingBalance > 0) {
        remainingBalance = balance;
        for (let i = 0; i < 12; i++) {
            unpaidBalance = remainingBalance - monthlyPayment;
            remainingBalance = unpaidBalance + (monthlyInterestRate * unpaidBalance);
        }
    
        if (remainingBalance > 0) {
            monthlyPayment += 10;
        }
    }
    console.log("Lowest payment: "+ monthlyPayment);
}

console.log("Test case 1:")
minPayment(3329, 0.2);
console.log("Test case 2:")
minPayment(4773, 0.2);
console.log("Test case 3:")
minPayment(3926, 0.2);


