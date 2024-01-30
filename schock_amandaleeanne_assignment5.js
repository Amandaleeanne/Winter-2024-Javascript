/*
********************************
*Part one of the assignment:
********************************
*/


//I realize its unnesisary to make it into a class, however, i thought it would be a fun excersize.
class CreditCard {
    constructor(cardNumber) {
        this.cardNumber = cardNumber.split('-').join('').split('');
        this.invalidCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()*+-?><'.split('');
    }

    validateCreditCard() {
        switch (true) {
            case this.cardNumber.length !== 16:
                return false;
            case this.containsInvalidCharacters():
                return false;
            case this.cardNumber[this.cardNumber.length - 1] % 2 !== 0:
                return false;
            case this.sum() < 16:
                return false;
            case this.checkElements():
                return false;
            default:
                return true;
        }
    }

    containsInvalidCharacters() {
        for (let i = 0; i < this.cardNumber.length; i++) {
            if (this.invalidCharacters.includes(this.cardNumber[i])) {
                return true;
            }
        }
        return false;
    }

    checkElements() {
        const firstElement = this.cardNumber[0];
        for (let i = 1; i < this.cardNumber.length; i++) {
            if (this.cardNumber[i] !== firstElement) {
                return false;
            }
        }
        return true;
    }

    sum() {
        let sum = 0;
        for (let i = 0; i < this.cardNumber.length; i++) {
            sum += parseInt(this.cardNumber[i], 10); // Convert each character to a number
        }
        return sum;
    }
}

const card1 = new CreditCard('9999-9999-8888-0000');
const card2 = new CreditCard('6666-6666-6666-1666');
const card3 = new CreditCard('a923-3211-9c01-1112');
const card4 = new CreditCard('4444-4444-4444-4444');
const card5 = new CreditCard('1111-1111-1111-1110');
const card6 = new CreditCard('6666-6666-6666-6661');
console.log('Part one fo the assignment TEST:')
console.log(card1.validateCreditCard()); // Output: true
console.log(card2.validateCreditCard()); // Output: true
console.log(card3.validateCreditCard()); // Output: false
console.log(card4.validateCreditCard()); // Output: false
console.log(card5.validateCreditCard()); // Output: false
console.log(card6.validateCreditCard()); // Output: false
/*
********************************
*Part two of the assignment:
********************************
*/
