function makeWord(wordMax) {
  let text = ''
  const possible='bcdfghjklmnpqrstvwxyz'
  const possibleVowels='aeiou'
  
    for(let i=0; i<wordMax; i=i+3){
      text += possible[Math.floor(Math.random()*possible.length)]
      text += possibleVowels[Math.floor(Math.random()*possibleVowels.length)]
      text += possible[Math.floor(Math.random()*possible.length)]
    }
  return text
  }
