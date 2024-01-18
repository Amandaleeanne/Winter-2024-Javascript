function isPalindrome(word) {
    //Base case
    if (word.length <= 1) {
        return true;
    } 
    //Recursive
    else {
        return word[0] === word[word.length - 1] && isPalindrome(word.slice(1, -1));
    }
}

inputWord = "hello"
console.log(`The word '${inputWord}' is a palindrome: ${isPalindrome(inputWord.toLowerCase())}`);
inputWord = "mom"
console.log(`The word '${inputWord}' is a palindrome: ${isPalindrome(inputWord.toLowerCase())}`);
