(()=>{var e={598:(e,t,n)=>{const r=n(25);e.exports=r},25:(e,t,n)=>{const{getRandomNumber:r,sortByValuesOfObject:o,checkRates:c,round:d}=n(410);e.exports=class{_data;_rates;constructor(e,t){if(this._data=t,e){if(!c(e))throw new Error("Total rates is not equal to 100%");this._rates=o(e)}}getPullByCollection(e=1){let t=this.getPullByRarity(e);t="string"==typeof t?[t]:t;const{collection:n,findKey:r}=this._data,o=t.map((e=>{const t=n.filter((t=>{let n=t;return r.split(".").forEach((e=>{n=n[e]})),n===e}));return t[d(Math.random()*(t.length-1))]}));return o.length>1?o:o[0]}setRates(e){c(e)&&(this._rates=o(e))}getRates(){return this._rates}getPullByRarity(e=1){const t=[];for(let n=0;n<e;n++){const e=r(0,100);let n=0;for(const[r,o]of Object.entries(this._rates))if(n+=o,e<=n){t.push(r);break}}return t.length>1?t:t[0]}}},410:(e,t)=>{t.getRandomNumber=(e,t)=>Math.random()*(t-e)+e,t.sortByValuesOfObject=e=>{const t={};return Object.entries(e).sort((([,e],[,t])=>e>t?1:t>e?-1:0)).forEach((([e,n])=>t[e]=n)),t},t.checkRates=e=>{let t=0;for(const[,n]of Object.entries(e))t+=n;return 100===t},t.round=e=>Number(e.toFixed())}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var c=t[r]={exports:{}};return e[r](c,c.exports,n),c.exports}(()=>{let e,t,r=30,o=0,c=30,d=[],a=0,l=[];document.getElementById("coins").innerText=c,document.getElementById("time-left").innerText=r;const i=new(n(598))({ssr:5.9,sr:12.8,r:18.8,c:62.5});let s=[{rarity:"c",wordLength:3,score:3},{rarity:"r",wordLength:5,score:5},{rarity:"sr",wordLength:7,score:7},{rarity:"ssr",wordLength:10,score:15}];function u(e){return s.find((e=>e.rarity===t))[e]}function m(){l.join("")===e?(document.getElementById("gacha-ball").innerText="Word matched! Press space for new word",a+=u("score")):document.getElementById("gacha-ball").innerText=`Incorrect word! Try again \nWord: ${e}`,l=[],document.getElementById("typed-word").innerText=" "}document.addEventListener("keydown",(function(n){if("Spacebar"===n.key||" "===n.key)return console.log(`in function gachaPull, score: ${a}`),t=i.getPullByRarity(),console.table(`in function gachaPull, varGachaPull: ${t}`),a+=u("score"),console.log(`in function gachaPull, score: ${a}`),e=function(e){const t="bcdfghjklmnpqrstvwxyz";let n="";for(let r=0;r<e;r+=3)n+=t[Math.floor(21*Math.random())],n+="aeiou"[Math.floor(5*Math.random())],n+=t[Math.floor(21*Math.random())];return n}(u("wordLength")),console.log(`in function gachaPull, word: ${e}`),document.getElementById("gacha-ball").innerText=`Rarity: ${t}, \nWord:${e}`,console.log(e),void console.log(e);if("Enter"===n.code)return void m();if("Backspace"===n.key)return 0!==l.length&&l.pop(),void(document.getElementById("typed-word").innerText=l.join(""));if("Delete"===n.key)return document.getElementById("gacha-ball").innerText=`Entire Sequence Cleared! \n Word:${e}`,l.length=0,void(document.getElementById("typed-word").innerText=" ");const r=n.key.toLowerCase();if(/[a-z]/.test(r))return l.push(r),typedWord=l.join(""),document.getElementById("typed-word").innerText=typedWord,typedWord.length===e.length?void m():void 0;document.getElementById("gacha-ball").innerText=`Invalid! \nWord: ${e}`})),document.getElementById("start-button").addEventListener("click",(function(){r=30+o,document.getElementById("start-button").disabled=!0,document.getElementById("buy-chance").disabled=!1,document.getElementById("buy-speed").disabled=!1,document.getElementById("gacha-ball").innerText="Space to pull the gachapon!";let e=setInterval((()=>{r--,document.getElementById("time-left").innerText=r,r<=0&&(clearInterval(e),d.push(a),document.getElementById("highscores").innerHTML=d.map((e=>`<li>Score: ${e}</li>`)).join(""),c+=Math.floor(a/1.5),a=0,document.getElementById("coins").innerText=c,document.getElementById("start-button").disabled=!1)}),1e3)})),document.getElementById("buy-chance").addEventListener("click",(function(){c>=10&&(c-=10,document.getElementById("coins").innerText=c,0===rarity.c&&0===rarity.r&&0===rarity.sr||rarity.c>0||rarity.r)})),document.getElementById("buy-speed").addEventListener("click",(function(){c>=20&&(c-=20,document.getElementById("coins").innerText=c,o+=10,document.getElementById("time-left").innerText=r)}))})()})();