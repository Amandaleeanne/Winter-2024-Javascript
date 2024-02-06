/*
********************************
*Part one of the assignment:
********************************
*/


function validateCreditCard(cardNumber) {
    const cleanedCardNumber = cardNumber.split('-').join('').split('');
    const invalidCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()*+-?><'.split('');

    switch (true) {
        case cleanedCardNumber.length !== 16:
            return false;
        case containsInvalidCharacters(cleanedCardNumber, invalidCharacters):
            return false;
        case cleanedCardNumber[cleanedCardNumber.length - 1] % 2 !== 0:
            return false;
        case sum(cleanedCardNumber) < 16:
            return false;
        case checkElements(cleanedCardNumber):
            return false;
        default:
            return true;
    }
}

function containsInvalidCharacters(cardNumber, invalidCharacters) {
    for (let i = 0; i < cardNumber.length; i++) {
        if (invalidCharacters.includes(cardNumber[i])) {
            return true;
        }
    }
    return false;
}

function checkElements(cardNumber) {
    const firstElement = cardNumber[0];
    for (let i = 1; i < cardNumber.length; i++) {
        if (cardNumber[i] !== firstElement) {
            return false;
        }
    }
    return true;
}

function sum(cardNumber) {
    let sum = 0;
    for (let i = 0; i < cardNumber.length; i++) {
        sum += parseInt(cardNumber[i], 10); // Convert each character to a number
    }
    return sum;
}


/* Using absraction (commented so no errors): 

function validateCreditCard(cardNumber) {
    const cleanedCardNumber = cardNumber.split('-').join('').split('');

    //Goes through all conditions of a credit card number by calling validation functions.
    return validate(cleanedCardNumber, [
        (cardNumber) => cardNumber.length !== 16,
        (cardNumber) => containsInvalidCharacters(cardNumber),
        (cardNumber) => cardNumber[cardNumber.length - 1] % 2 !== 0,
        (cardNumber) => sum(cardNumber) < 16,
        (cardNumber) => checkElements(cardNumber)
    ]);
}

function validate(cardNumber, validators) {
    for (const validator of validators) {
        if (validator(cardNumber)) {
            return false;
        }
    }
    return true;
}

function containsInvalidCharacters(cardNumber) {
    const invalidCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()*+-?><'.split('');
    for (let i = 0; i < cardNumber.length; i++) {
        if (invalidCharacters.includes(cardNumber[i])) {
            return true;
        }
    }
    return false;
}

function checkElements(cardNumber) {
    const firstElement = cardNumber[0];
    for (let i = 1; i < cardNumber.length; i++) {
        if (cardNumber[i] !== firstElement) {
            return false;
        }
    }
    return true;
}

function sum(cardNumber) {
    let sum = 0;
    for (let i = 0; i < cardNumber.length; i++) {
        sum += parseInt(cardNumber[i], 10); // Convert each character to a number to then add together
    }
    return sum;
}
*/



console.log('Part one of the assignment ')
console.log(validateCreditCard('9999-9999-8888-0000')); // Output: true
console.log(validateCreditCard('6666-6666-6666-1666')); // Output: true
console.log(validateCreditCard('a923-3211-9c01-1112')); // Output: false
console.log(validateCreditCard('4444-4444-4444-4444')); // Output: false
console.log(validateCreditCard('1111-1111-1111-1110')); // Output: false
console.log(validateCreditCard('6666-6666-6666-6661')); // Output: false
/*
********************************
*Part two of the assignment:
********************************
*/
class Item {
    constructor(name, price, taxable = false) {
        this.name = name;
        this.price = price;
        this.taxable = taxable;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

        addItem(item) {
            this.items.push(item);
        }
}

function cashRegister(cart) {
    let totalPrice = 0;

    for (const item of cart.items) {
        if (item.taxable) {
            totalPrice += item.price * 1.1; // Apply 10% tax
        } else {
            totalPrice += item.price;
        }
    }

    return totalPrice;
}


const apple = new Item("apple", 5);
const carrot = new Item("carrot", 0.45);
const shirt = new Item("shirt", 55);
const book = new Item("book", 20, true); // Taxable item

const cart1 = new ShoppingCart();
cart1.addItem(apple);
cart1.addItem(carrot);
cart1.addItem(shirt);

const cart2 = new ShoppingCart();
cart2.addItem(apple);
cart2.addItem(book);

console.log('Part one of the assignment ')
console.log("Cart 1 Total:", cashRegister(cart1)); // Output: Cart 1 Total: 60.45
console.log("Cart 2 Total:", cashRegister(cart2)); // Output: Cart 2 Total: 27