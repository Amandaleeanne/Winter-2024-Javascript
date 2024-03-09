//UI updates:
  export function updateUICoins(coins) {
    document.getElementById('coins').innerText = coins;
  }

export function updateUITimeLeft(timeLeft) {
    document.getElementById('time-left').innerText = timeLeft;
  }

export function clearTypedWord(){
  document.getElementById('typed-word').innerText = " ";
}  

// Get dictionary information based on the gacha pull
export function getDictionaryInfo(property, varGachaPull, pullInfo) {
    let result = pullInfo.find(info => info.rarity === varGachaPull);
    return result[property];
  }

//Advanced help:
  // Generate a word based on the wordMax length
  export function generateWord(wordMax) {
    let word = '';
    let countConsecutiveConsonants = 0; //cannot be more than 2
    let countConsecutiveVowels = 0; //cannot be more than 2
    let forbiddenWords = ['cum', 'tit', 'sex'];
    /*for more easier to type words and kinda english*/
    for (let i = 0; i < wordMax; i++) {
      if (i % 2 === 0){
          //chance to add a vowel instead
          if (Math.random() > 0.5 && countConsecutiveVowels < 1){
            word += vowelPicker();
            countConsecutiveVowels++;
            countConsecutiveConsonants = 0;
          }else{
            word += consonantPicker();
            countConsecutiveConsonants ++;
            countConsecutiveVowels = 0;
          }
     } else {
          if (countConsecutiveVowels < 1)
          {
            word += vowelPicker();
          countConsecutiveVowels++;
          countConsecutiveConsonants = 0;
          }else {
            word += consonantPicker();
            countConsecutiveConsonants ++;
            countConsecutiveVowels = 0;
          }
      }
  }
    if (forbiddenWords.includes(word)){
      return generateWord(wordMax);
    }else{
      return word;
    }
  }

  function consonantPicker(){
    const possibleCommonConsonants = 'tnrsldcmhp' // 80%
    const possibleUncommonConsonants = 'bfgkvwy'; //15%
    const possibleRareConsonants = 'xzjq' //5%
    let percent = Math.random();
    if (percent <= 0.05) {
        return possibleRareConsonants[Math.floor(Math.random() * possibleRareConsonants.length)];
    } else if (percent <= 0.15) {
        return possibleUncommonConsonants[Math.floor(Math.random() * possibleUncommonConsonants.length)];
    } else {
        return possibleCommonConsonants[Math.floor(Math.random() * possibleCommonConsonants.length)];
    }
  }

  function vowelPicker(){
    const possibleVowels = {1:'a', 2:'e', 3:'i', 4:'o', 5:'u'};
    let percent = Math.random();
    if (percent <= 0.3) {
      return possibleVowels[5];
    } else if (percent <= 0.6) {
      return Math.random() < 0.5 ? possibleVowels[3] : possibleVowels[4];
    } else if (percent <= 0.7) {
      return possibleVowels[1];
    } else {
      return possibleVowels[2];
    }
  }

  // Submit word logic
export function submitWord(word, sequence,varGachaPull, pullInfo) {
  let typedWord = sequence.join("");
  if (typedWord === word) {
    document.getElementById('gacha-ball').innerText = "Word matched! Press space for new word";
  } else {
    document.getElementById('gacha-ball').innerText = `Incorrect word! Try again \nWord: ${word}`;
  }
  clearTypedWord();
  return getDictionaryInfo('score', varGachaPull, pullInfo);
}

