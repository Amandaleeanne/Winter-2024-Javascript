function digitOccurred(digits) {
    let digitOccurred = []
    for (i = 1; i < cardNumber.length-1; i++) {
        if (cardNumber[i] == cardNumber[i-1]){
            digitOccurred.push(true);
        }else{
            digitOccurred.push(false);
        }
    }   
}