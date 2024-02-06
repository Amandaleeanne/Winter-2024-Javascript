
let problem1 = function(string){
    validVowels = ['a','e','i','o','u'];
    let countVowels = 0;
    for (char of string){
        if (validVowels.includes(char)){
            countVowels += 1;
        }
    };
    return `Number of vowels: ${countVowels}`;
};

let problem2 = function(string, keyword){
    let count = 0;
    let index = string.indexOf(keyword);

    while (index !== -1) {
        count++;
        index = s.indexOf(keyword, index + 1);
    }
    return `Number of times ${keyword} occurs is: ${count}`;       
};

console.log(problem1('azcbobobegghakl'));
console.log(problem2('azcbobobegghakl'));