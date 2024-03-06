//Programming by amandaleeanne
//Credit to marviuz for thier gacha library: https://codesandbox.io/p/sandbox/gacha-js-gwqum6


//note to self driver to get to the next word hasnt been added.
//be sure to thoroughly inspect code for logic errors as some of this is copy paste.
let timeLeft = 30;
let coins = 30;
let highscores = [];
//Gacha handling
const GachaJS = require('gacha-js');
let rates = {
    ssr: 5.9,
    sr: 12.8,
    r: 18.8,
    c: 62.5,
  };
const gacha = new GachaJS(rates);
let pullInfo = [
    {rarity: 'c', wordLength:3, score: 3},
    {rarity: 'r', wordLength:5, score: 5},
    {rarity: 'sr', wordLength:7, score: 7},
    {rarity: 'ssr', wordLength:10, score: 15}];
let score = 0;


function startGame() {
  document.getElementById('start-button').disabled = true;
  document.getElementById('buy-chance').disabled = false;
  document.getElementById('buy-speed').disabled = false;
  document.getElementById('gacha-ball').innerText = 'Pull the gachapon!';
  let countdown = setInterval(() => {
    timeLeft--;
    document.getElementById('time-left').innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(countdown);
      endGame();
    }
  }, 1000);
  while(timeLeft > 0){
    //Key listener using event delegation and key combinations:
    document.addEventListener("keydown", function(event) {
      // Key combination check (optional)
      if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) {
        return; // Ignore key combinations
      }
    
      const pressedKey = event.key.toLowerCase(); // Convert to lowercase for case-insensitive matching
      let sequence = ""; // Persistent sequence variable for tracking key presses
    
      // Update sequence on valid key press
      if (/[a-z]/.test(pressedKey)) { // Check for valid alphabet character
        sequence += pressedKey;
      } else {
        // Clear sequence on invalid key press or backspace
        if (event.key === "Backspace" || event.key === "Delete") {
          document.getElementById('gacha-ball').innerText = 'Entire Sequence Cleared!';
          sequence = "";
        } else {
          document.getElementById('gacha-ball').innerText = 'Wrong letter!';
          return; // Ignore non-alphabetic keys
        }
      }
    
      // Check if the sequence matches the target word
      if (sequence === word) {
        document.getElementById('gacha-ball').innerText = `word ${word} matched! Press space for new word`;
        score += getDictonaryInfo(gachaPull, 'score');
        sequence = ""; // Reset sequence for next matching attempt
      }
    
      // Driver to get to the next word
      if (event.code === "Space") {
        if (sequence === word) {
          document.getElementById('gacha-ball').innerText = "Word matched! Press space for new word";
          score += getDictonaryInfo(gachaPull, 'score');
          sequence = "";
          gachaPull(); // Call gachaPull() to generate a new word
        } else {
          document.getElementById('gacha-ball').innerText = "Incorrect word! Press space to try again";
          sequence = "";
        }
      }
    });
  }
}

function getDictonaryInfo(rarity, property) {
  let result = pullInfo.find(info => info.rarity === rarity);
  return result[property];
}

function gachaPull() {
    //handles the random word generation based on the gacha pull
    
    //pull a gacha and update score
    let gachaPull = gacha.getPullByRarity();

    //Generate a word with length depending on the pull: c: 3, r:5, sr:7, ssr:10
    let word = makeWord(getDictonaryInfo(gachaPull, 'wordLength'));
    //display word on screen
    document.getElementById('gacha-ball').innerText = word;
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

function endGame() {
  highscores.push(score);
  document.getElementById('highscores').innerHTML = highscores.map(score => `<li>${score}</li>`).join('');
  coins += Math.floor(highscore/1.5);
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
            // disable the increase chance button
        } else {
            if (rarity.c > 0) {
                // minus c chance and distribute the minus to other rarities 
                //For example: c chance -12, 10/4 all other rarities go up by 4 
            } else if (rarity.r > 0) {
                // minus r chance and distribute to other rarities
            } else {
                // minus sr chance and distribute to other rarities
            }
        }
        

  }
}

function buySpeed() {
  if (coins >= 20) {
    coins -= 20;
    document.getElementById('coins').innerText = coins;
    timeLeft += 10;
    document.getElementById('time-left').innerText = timeLeft;
  }
}

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('buy-chance').addEventListener('click', buyChance);
document.getElementById('buy-speed').addEventListener('click', buySpeed);
