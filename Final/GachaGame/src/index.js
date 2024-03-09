// Importing required libraries and modules
const GachaJS = require('gacha-js');
import { updateUICoins, generateWord, updateUITimeLeft, getDictionaryInfo, submitWord, clearTypedWord } from './utils.js';
//import {  } from './shop.js';
// Global variables initialization
let timeLeft = 30;
let timeAdded = 0;
let coins = 0;
let highscores = [];
let score = 0;
let word;

let sequence = [];
let varGachaPull;

// Updating UI with initial values
updateUICoins(coins);
updateUITimeLeft(timeLeft);

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
let pullInfo = [
  { rarity: 'c', wordLength: 3, score: 3 },
  { rarity: 'r', wordLength: 5, score: 5 },
  { rarity: 'sr', wordLength: 7, score: 7 },
  { rarity: 'ssr', wordLength: 10, score: 15 }
];

// Start game function
function startGame() {
  timeLeft = 30 + timeAdded;
  updateUITimeLeft(timeLeft);
  document.getElementById('start-button').disabled = true;
  document.getElementById('gacha-ball').innerText = 'Space to pull the gachapon!';
  document.addEventListener('keydown', keyDown);
  // Countdown timer
  let countdown = setInterval(() => {
    updateTimeLeft(countdown);
  }, 1000);
}

// Update time left and end game if time runs out
function updateTimeLeft(countdown) {
  timeLeft--;
  updateUITimeLeft(timeLeft);
  if (timeLeft <= 0) {
    clearInterval(countdown);
    endGame();
  }
}

// End game logic
function endGame() {
  document.removeEventListener('keydown', keyDown);
  document.getElementById('gacha-ball').innerHTML = 'Well done! Check your score below.';
  highscores.push(score);
  document.getElementById('highscores').innerHTML = highscores.map(score => `<li>Score: ${score}</li>`).join('');
  coins += Math.floor(score / 2);
  score = 0;
  updateUICoins(coins);
  clearTypedWord();
  document.getElementById('start-button').disabled = false;
}

function keyDown (event) {
  /*
  helper function so eventListeners can be 
  turned on or off easily.
  Handles what happpens on valid keydown events
  */
  if (event.key === " ") {
    if (sequence.length !== 0){
      sequence = [];
      clearTypedWord();
    }
    gachaPull();
    return;
  }
  if (event.code === "Enter") {
    score += submitWord(word, sequence, varGachaPull, pullInfo);
    sequence = [];
    return;
  }
  if (event.key === "Backspace") {
    if (sequence.length !== 0) { sequence.pop(); }
    document.getElementById('typed-word').innerText = sequence.join("");
    return;
  }
  if (event.key === "Delete") {
    document.getElementById('gacha-ball').innerText = `Entire Sequence Cleared! \n Word: ${word}`;
    sequence = [];
    clearTypedWord();
    return;
  }
  const pressedKey = event.key.toLowerCase();
  if (/[a-z]/.test(pressedKey)) {
    sequence.push(pressedKey);
    let typedWord = sequence.join("");
    document.getElementById('typed-word').innerText = typedWord;
    if (typedWord.length === word.length) {
      score += submitWord(word, sequence, varGachaPull, pullInfo);
      sequence = [];
      return;
    }
    return;
  }
  document.getElementById('gacha-ball').innerText = `Invalid! \nWord: ${word}`;
}

// Handle gacha pull
function gachaPull() {
  varGachaPull = gacha.getPullByRarity();
  console.log('Gacha Pull');
  console.table(pullInfo);
  word = generateWord(getDictionaryInfo('wordLength',varGachaPull, pullInfo));
  document.getElementById('gacha-ball').innerText = `Rarity: ${varGachaPull}, \nWord: ${word}`;
}

//-------------------------------Shop:------------------------------------

function buyChance() {
  if (coins >= 10) {
    coins -= 10;
    updateUICoins(coins);
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

function buyTime() {
  if (coins >= 20) {
    coins -= 20;
    timeAdded += 10;
    updateUICoins(coins);
    updateUITimeLeft(timeLeft+timeAdded);
  }
}

// Reduce word length logic
function reduceWordLength() {
  if (coins >= 40) {
    coins -= 40;
    updateUICoins(coins)
    console.table(pullInfo);
    pullInfo.forEach((item) => {
      if (item.wordLength > 1) { item.wordLength -= 1; console.log(item.wordLength); }
    });
    console.table(pullInfo);
  }
  console.table(pullInfo);
}
console.table(pullInfo);
// Event listeners for UI buttons
document.getElementById('start-button').addEventListener('click', startGame);
//document.getElementById('buy-chance').addEventListener('click', buyChance);
document.getElementById('buy-speed').addEventListener('click', buyTime);
document.getElementById('reduce-word').addEventListener('click', reduceWordLength);
