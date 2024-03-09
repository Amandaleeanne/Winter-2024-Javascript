// Importing required libraries and modules
const GachaJS = require('gacha-js');
import { keyDown } from 'utils.js';
// Global variables initialization
let timeLeft = 30;
let timeAdded = 0;
let coins = 3000;
let highscores = [];
let score = 0;
let word;
let sequence = [];
let varGachaPull;

// Updating UI with initial values
document.getElementById('coins').innerText = coins;
document.getElementById('time-left').innerText = timeLeft;

// Gacha rates configuration
let rates = {
  ssr: 5.9,
  sr: 10.8,
  r: 17.3,
  c: 66,
};

// Creating a Gacha instance
let gacha = new GachaJS(rates);

// Defining pull information based on rarity
const pullInfo = [
  { rarity: 'c', wordLength: 3, score: 3 },
  { rarity: 'r', wordLength: 5, score: 5 },
  { rarity: 'sr', wordLength: 7, score: 7 },
  { rarity: 'ssr', wordLength: 10, score: 15 }
];

// Start game function
function startGame() {
  timeLeft = 30 + timeAdded;
  updateUITimeLeft();
  document.getElementById('start-button').disabled = true;
  document.getElementById('gacha-ball').innerText = 'Space to pull the gachapon!';
  document.addEventListener('keydown', keyDown);
  // Countdown timer
  let countdown = setInterval(() => {
    updateTimeLeft(countdown);
  }, 1000);
}

// Update UI with current time left
function updateUITimeLeft() {
  document.getElementById('time-left').innerText = timeLeft;
}

// Update time left and end game if time runs out
function updateTimeLeft(countdown) {
  timeLeft--;
  updateUITimeLeft();
  if (timeLeft <= 0) {
    clearInterval(countdown);
    endGame();
  }
}

// Get dictionary information based on the gacha pull
function getDictionaryInfo(property) {
  let result = pullInfo.find(info => info.rarity === varGachaPull);
  return result[property];
}

// Generate a word based on the wordMax length
function generateWord(wordMax) {
  const possibleConsonants = 'bcdfghjklmnpqrstvwxyz';
  const possibleVowels = 'aeiou';
  let text = '';

  for (let i = 0; i < wordMax; i += 3) {
    text += possibleConsonants[Math.floor(Math.random() * possibleConsonants.length)];
    text += possibleVowels[Math.floor(Math.random() * possibleVowels.length)];
    text += possibleConsonants[Math.floor(Math.random() * possibleConsonants.length)];
  }

  return text;
}

// Handle gacha pull
function gachaPull() {
  varGachaPull = gacha.getPullByRarity();
  score += getDictionaryInfo('score');
  word = generateWord(getDictionaryInfo('wordLength'));
  updateGachaBall();
}

// Update gacha ball with current word and rarity
function updateGachaBall() {
  document.getElementById('gacha-ball').innerText = `Rarity: ${varGachaPull}, \nWord: ${word}`;
}

// End game logic
function endGame() {
  document.removeEventListener('keydown', keyDown);
  highscores.push(score);
  updateHighscores();
  coins += Math.floor(score / 2);
  score = 0;
  updateUICoins();
  document.getElementById('typed-word').innerText = " ";
  document.getElementById('start-button').disabled = false;
}

// Update highscores in the UI
function updateHighscores() {
  document.getElementById('highscores').innerHTML = highscores.map(score => `<li>Score: ${score}</li>`).join('');
}

// Update coins in the UI
function updateUICoins() {
  document.getElementById('coins').innerText = coins;
}

// Buy chance logic
function buyChance() {
  if (coins >= 10) {
    coins -= 10;
    updateUICoins();
    if (rates.c === 0 && rates.r === 0 && rates.sr === 0) {
      document.getElementById('buy-speed').disabled = true;
    } else {
      adjustGachaRates();
    }
  }
}

// Adjust gacha rates based on buying chance
function adjustGachaRates() {
    if (rates.c > 0) {
        // minus c chance and distribute the minus to other rarities 
        //For example: c chance -12, 10/4 all other rarities go up by 4
        rates.c -= 5;
        rates.r += 3;
        rates.sr += 1.5;
        rates.ssr += 0.5;
        console.table(`first if: ${rates}`);
        if (rates.c === 1) {
          rates.c = 0;
          rates.r += 1;
          gacha =  new GachaJS(rates);
        }
        gacha =  new GachaJS(rates);
        console.table(gacha);
    }else if (rates.r > 0) {
        // minus r chance and distribute to other rarities
        console.log(rates.r);
        rates.r -= 3;
        console.log(rates.r);
        console.log(rates.sr);
        rates.sr += 2.5;
        console.log(rates.sr);
        console.log(rates.ssr);
        rates.ssr += 0.5;
        console.log(rates.ssr);
        console.table(`second if: ${rates}`);
        gacha =  new GachaJS(rates);
        console.table(gacha);
    }else{
      // minus sr chance and distribute to other rarities
      rates.sr -= 3;
      rates.ssr += 3;
      console.table(`last if: ${rates}`);
      gacha =  new GachaJS(rates);
      console.table(gacha);
    }
}


// Buy speed logic
function buySpeed() {
  if (coins >= 20) {
    coins -= 20;
    timeAdded += 10;
    updateUICoins();
    updateUITimeLeft();
  }
}

// Reduce word length logic
function reduceWordLength() {
  if (coins >= 40) {
    coins -= 40;
    updateUICoins();
    pullInfo.forEach((item) => {
      if (item.wordLength !== 1) { item.wordLength -= 1; }
    });
  }
}

// Submit word logic
function submitWord() {
  let typedWord = sequence.join("");
  if (typedWord === word) {
    document.getElementById('gacha-ball').innerText = "Word matched! Press space for new word";
    score += getDictionaryInfo('score');
  } else {
    document.getElementById('gacha-ball').innerText = `Incorrect word! Try again \nWord: ${word}`;
  }
  sequence.length = 0;
  document.getElementById('typed-word').innerText = " ";
}




// Event listener for keydown events


// Event listeners for UI buttons
document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('buy-chance').addEventListener('click', buyChance);
document.getElementById('buy-speed').addEventListener('click', buySpeed);
document.getElementById('reduce-word').addEventListener('click', reduceWordLength);
