//Programming by amandaleeanne
//Credit to marviuz for thier gacha library, see package.json dependencies.

//note to self driver to get to the next word hasnt been added.
let timeLeft = 30;
let timeAdded = 0;
let coins = 30;
let highscores = [];
let score = 0;
let word;
let sequence = [];
let varGachaPull;
document.getElementById('coins').innerText = coins;
document.getElementById('time-left').innerText = timeLeft;
//Gacha handling
const GachaJS = require('gacha-js');

let rates = {
    ssr: 5.9,
    sr: 10.8,
    r: 17.8,
    c: 65.5,
};
let gacha =  new GachaJS(rates);
let pullInfo = [
    {rarity: 'c', wordLength:3, score: 3},
    {rarity: 'r', wordLength:5, score: 5},
    {rarity: 'sr', wordLength:7, score: 7},
    {rarity: 'ssr', wordLength:10, score: 15}];



function startGame() {
  timeLeft = 30 + timeAdded;
  document.getElementById('time-left').innerText = timeLeft;
  document.getElementById('start-button').disabled = true;
  document.getElementById('gacha-ball').innerText = 'Space to pull the gachapon!';
  let countdown = setInterval(() => {
    timeLeft--;
    document.getElementById('time-left').innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(countdown);
      //document.removeEventListener("keydown", spaceBarHandler());
      endGame();
    }
  }, 1000);
}

function getDictonaryInfo(property) {
  let result = pullInfo.find(info => info.rarity === varGachaPull);
  return result[property];
}

function makeWord(wordMax) {
  const possible = 'bcdfghjklmnpqrstvwxyz';
  const possibleVowels = 'aeiou';
  let text = '';

  for (let i = 0; i < wordMax; i += 3) {
    text += possible[Math.floor(Math.random() * possible.length)];
    text += possibleVowels[Math.floor(Math.random() * possibleVowels.length)];
    text += possible[Math.floor(Math.random() * possible.length)];
  }

  return text;
}

function gachaPull() {
    //handles the random word generation based on the gacha pull and display of word
    console.log(`in function gachaPull, score: ${score}` );
    //pull a gacha and update score
    varGachaPull = gacha.getPullByRarity();
    console.table(`in function gachaPull, varGachaPull: ${varGachaPull}` );
    score += getDictonaryInfo('score');
    console.log(`in function gachaPull, score: ${score}` );
    //Generate a word with length depending on the pull: c: 3, r:5, sr:7, ssr:10
    word = makeWord(getDictonaryInfo('wordLength'));
    console.log(`in function gachaPull, word: ${word}` );
    //display word on screen
    document.getElementById('gacha-ball').innerText = `Rarity: ${varGachaPull}, \nWord:${word}`;
    console.log(word);
}

function endGame() {
  highscores.push(score);
  document.getElementById('highscores').innerHTML = highscores.map(score => `<li>Score: ${score}</li>`).join('');
  coins += Math.floor(score/2);
  score = 0;
  document.getElementById('coins').innerText = coins;
  document.getElementById('start-button').disabled = false;
}

function buyChance() {
  if (coins >= 10) {
    coins -= 10;
    document.getElementById('coins').innerText = coins;
    // Increase chance logic
        //decrease most common chance and distribute chance to other rarities.
        if (rarity.c === 0 && rarity.r === 0 && rarity.sr === 0) {
          document.getElementById('buy-speed').disabled = true;
        } else {
            if (rarity.c > 0) {
                // minus c chance and distribute the minus to other rarities 
                //For example: c chance -12, 10/4 all other rarities go up by 4
                rates.c -= 5;
                rates.r += 3;
                rates.sr += 1.5;
                rates.ssr += 0.5;
                gacha =  new GachaJS(rates);
                console.table(gacha);
            } else if (rarity.r > 0) {
                // minus r chance and distribute to other rarities
                rates.r -= 5;
                rates.sr += 1.5;
                rates.ssr += 1.0;
                gacha =  new GachaJS(rates);
                console.table(gacha);
            } else {
                rates.sr += 3;
                rates.ssr += 3;
                gacha =  new GachaJS(rates);
                console.table(gacha);
                // minus sr chance and distribute to other rarities
            }
        }
  }
}

function buySpeed() {
  if (coins >= 20) {
    coins -= 20;
    document.getElementById('coins').innerText = coins;
    timeAdded += 10;
    document.getElementById('time-left').innerText = timeLeft;
  }
}

function reduceWordLength() {
    if (coins >= 40) {
      coins -= 40;
      document.getElementById('coins').innerText = coins;
      for (rarity of pullInfo){
        //get the score value and subtract it by 1
        if (rarity.score !== 0){
          rarity.score -= 1;
        }
      }
    }
}


function submitWord(){
  let typedWord = sequence.join("");
  if ( typedWord === word) {
    document.getElementById('gacha-ball').innerText = "Word matched! Press space for new word";
    score += getDictonaryInfo('score');
  }else{
    document.getElementById('gacha-ball').innerText = `Incorrect word! Try again \nWord: ${word}`;
  }
  sequence = [];
  document.getElementById('typed-word').innerText = " ";
}

document.addEventListener('keydown', function(event){
  if (event.key === "Spacebar" || event.key === " ") {
    gachaPull();
    console.log(word);
    return;
  }
  if (event.code === "Enter") {
      submitWord();
      return; 
    }
  // remove last added letter sequence on backspace
  if (event.key === "Backspace") {
    if (sequence.length !== 0){sequence.pop();}
    document.getElementById('typed-word').innerText = sequence.join("");
    return;
  }
  if (event.key === "Delete"){
    document.getElementById('gacha-ball').innerText = `Entire Sequence Cleared! \n Word:${word}` ;
    sequence.length = 0;
    document.getElementById('typed-word').innerText = " ";
    return;
  }
  // Update sequence on valid key press
  const pressedKey = event.key.toLowerCase(); //case-insensitive matching
  if (/[a-z]/.test(pressedKey)) { 
        sequence.push(pressedKey); 
        typedWord = sequence.join("");
        document.getElementById('typed-word').innerText = typedWord;
        //auto submit if match word length
        if(typedWord.length === word.length) {
          submitWord();
          return;
        }
        return;
      }
  document.getElementById('gacha-ball').innerText = `Invalid! \nWord: ${word}`;
});

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('buy-chance').addEventListener('click', buyChance);
document.getElementById('buy-speed').addEventListener('click', buySpeed);
document.getElementById('reduce-word').addEventListener('click', reduceWordLength);

