function shift(char, shift_distance){

    const alphabetLower = 'abcdefghijklmnopqrstuvwxyz';
    const alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


    if ('./?,!@#$%& '.includes(char)){
        return char;
    }

    let index = alphabetLower.indexOf(char.toLowerCase()) + shift_distance;
    //Wrap around driver
    if (index >= alphabetLower.length) {
        index = index % alphabetLower.length;
    } else if (index <= 0){
        index = (index + alphabetLower.length) % alphabetLower.length;
    }

    //Shifting
    if (alphabetLower.includes(char)){
       char = alphabetLower[index];
    }else if (alphabetUpper.includes(char)){
        char = alphabetUpper[index];
    }
    return char;
}
function cipher(plainText, shift_distance) { 
    
    plainText = plainText.split('');
    for (char in plainText) {
        plainText[char] = shift(plainText[char], shift_distance);
    }

    return plainText.join('');
}
   function decipher(encryptedText, shift_distance) { 
     encryptedText = encryptedText.split('');
     for (char in encryptedText) {
        encryptedText[char] = shift(encryptedText[char], -shift_distance);
     }
    return encryptedText.join('');
   }

   //Given test cases:
   console.log('plain text | shift | cipherText | decipered text')
   console.log('------ | ----- | ---------- | --------------')
   //Test 1:
   let plainText = 'Hello world!'
   let shiftNum = 5;
   let cipherText = cipher(plainText, shiftNum);
   let decipherCipherText = decipher(cipherText, shiftNum);
   console.log('| '+ plainText + '| ' + shiftNum + '| ' + cipherText + '| ' + decipherCipherText + '|');
   //Test 2:
    plainText = 'abcdef'
    shiftNum = 2;
    cipherText = cipher(plainText, shiftNum);
    decipherCipherText = decipher(cipherText, shiftNum);
   console.log('| '+ plainText + '| ' + shiftNum + '| ' + cipherText + '| ' + decipherCipherText + '|');
   