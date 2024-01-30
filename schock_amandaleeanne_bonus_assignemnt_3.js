
//Function takes into account other test cases that are something like 1.5
function convertFractionalBase10ToBase2(number){

// Separate the integer and fractional parts
let wholeNumber = Math.floor(number);
let decimalPart = number - wholeNumber;

// Convert the wholeNumber part to binary
let binaryWholeNumber = '';
while (wholeNumber > 0) {
    binaryWholeNumber = (wholeNumber % 2) + binaryWholeNumber;
    wholeNumber = Math.floor(wholeNumber / 2);
}

// Convert the decimalPart to binary
let binaryFractional = '';
while (decimalPart > 0) {
    decimalPart *= 2;
    binaryFractional += Math.floor(decimalPart);
    decimalPart -= Math.floor(decimalPart);
}

// Combine the binary representation of whole number and decimal parts
const binaryResult = binaryWholeNumber + (binaryFractional.length > 0 ? '.' + binaryFractional : '');

return binaryResult;
}


//Test case:
console.log(convertFractionalBase10ToBase2(0.375));
console.log(convertFractionalBase10ToBase2(10.375));