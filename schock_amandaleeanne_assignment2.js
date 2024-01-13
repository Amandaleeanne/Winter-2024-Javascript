//Method one
console.log('Method one, toString(2) method:\n')
const readline = require('readline-sync');
let input1 = readline.question('Please enter a number: ');
let output1 = '';
output1 = input1.toString(2);
console.log(input1 + ' is the same as ' + output1);


//Method Two
console.log('Method two, integer division and modulo:\n')
let input = readline.question('Please enter a number: ').trim();
let output = '';
if  (!isNaN(input)) {

    while (input != 0) {
       let calculate = input % 2;
        output = calculate.toString() + output;
        input = Math.floor(input / 2);
    }  
}
console.log(input + ' is the same as ' + output);
