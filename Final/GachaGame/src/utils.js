 export function keyDown (event) {
    if (event.key === " ") {
      gachaPull();
      return;
    }
    if (event.code === "Enter") {
      submitWord();
      return;
    }
    if (event.key === "Backspace") {
      if (sequence.length !== 0) { sequence.pop(); }
      document.getElementById('typed-word').innerText = sequence.join("");
      return;
    }
    if (event.key === "Delete") {
      document.getElementById('gacha-ball').innerText = `Entire Sequence Cleared! \n Word: ${word}`;
      sequence.length = 0;
      document.getElementById('typed-word').innerText = " ";
      return;
    }
    const pressedKey = event.key.toLowerCase();
    if (/[a-z]/.test(pressedKey)) {
      sequence.push(pressedKey);
      let typedWord = sequence.join("");
      document.getElementById('typed-word').innerText = typedWord;
      if (typedWord.length === word.length) {
        submitWord();
        return;
      }
      return;
    }
    document.getElementById('gacha-ball').innerText = `Invalid! \nWord: ${word}`;
  }