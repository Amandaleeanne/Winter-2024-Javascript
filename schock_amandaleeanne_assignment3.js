function sumDigits(number) {
    sum = 0;
    numberString = number.toString();
    for (var i = 0; i < numberString.length; i++) {
        sum += parseInt(numberString.charAt(i));
    }
    return sum;
}

//test cases:

//sumDigits(234);  //pass, returns 9
//sumDigits(222);  //pass, Returns 6,
//sumDigits(1234); //pass, Returns 10