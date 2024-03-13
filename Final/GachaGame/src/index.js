/**
 * Code by Amandaleeanne. 
 * External Libraries not made by me: gacha-js
 * Programming paradigm: Procedural programming
 * some functional programming as well.
 */
/**
 *  Importing required libraries and modules
 */
const GachaJS = require('gacha-js');
import { updateUICoins, generateWord, updateUITimeLeft, getDictionaryInfo, submitWord, clearTypedWord } from './utils.js';
/**
 * Global variables initialization
 */

let timeLeft = 30;
let timeAdded = 0;
let coins = 0;
let highscores = [];
let score = 0;
let word;

let sequence = [];
let varGachaPull;

/**
 * Initalize UI
 */
updateUICoins(coins);
updateUITimeLeft(timeLeft);

/**
 * Initialize Gacha pulls and information
 */
let rates = {
  ssr: 5.9,
  sr: 10.8,
  r: 17.3,
  c: 66,
};

let gacha = new GachaJS(rates);

let pullInfo = [
  { rarity: 'c', wordLength: 3, score: 3 },
  { rarity: 'r', wordLength: 5, score: 5 },
  { rarity: 'sr', wordLength: 7, score: 7 },
  { rarity: 'ssr', wordLength: 10, score: 15 }
];

/**
 * Start game, and handle nessesary events 
 */
function startGame() {
  //reset time and take into account bought time(timeAdded).
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
  word = generateWord(getDictionaryInfo('wordLength',varGachaPull, pullInfo));
  document.getElementById('gacha-ball').innerText = `Rarity: ${varGachaPull}, \nWord: ${word}`;
}

//-------------------------------Shop:------------------------------------
//Note: even though this handles a diiferet thing than the rest of the script,
//since its such a small part of the game, it is not put into its own script.

function buyTime() {
  if (coins >= 20) {
    coins -= 20;
    timeAdded += 10;
    updateUICoins(coins);
    updateUITimeLeft(30+timeAdded);
  }
}

// Reduce word length logic
function reduceWordLength() {
  if (coins >= 40) {
    coins -= 40;
    updateUICoins(coins)
    pullInfo.forEach((item) => {
      if (item.wordLength > 1) { item.wordLength -= 1; console.log(item.wordLength); }
    });
  }
}
// Event listeners for UI buttons
document.getElementById('start-button').addEventListener('click', startGame);
//document.getElementById('buy-chance').addEventListener('click', buyChance);
document.getElementById('buy-speed').addEventListener('click', buyTime);
document.getElementById('reduce-word').addEventListener('click', reduceWordLength);
