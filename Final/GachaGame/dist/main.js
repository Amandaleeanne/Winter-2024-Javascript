(()=>{var e={598:(e,t,n)=>{const r=n(25);e.exports=r},25:(e,t,n)=>{const{getRandomNumber:r,sortByValuesOfObject:o,checkRates:c,round:s}=n(410);e.exports=class{_data;_rates;constructor(e,t){if(this._data=t,e){if(!c(e))throw new Error("Total rates is not equal to 100%");this._rates=o(e)}}getPullByCollection(e=1){let t=this.getPullByRarity(e);t="string"==typeof t?[t]:t;const{collection:n,findKey:r}=this._data,o=t.map((e=>{const t=n.filter((t=>{let n=t;return r.split(".").forEach((e=>{n=n[e]})),n===e}));return t[s(Math.random()*(t.length-1))]}));return o.length>1?o:o[0]}setRates(e){c(e)&&(this._rates=o(e))}getRates(){return this._rates}getPullByRarity(e=1){const t=[];for(let n=0;n<e;n++){const e=r(0,100);let n=0;for(const[r,o]of Object.entries(this._rates))if(n+=o,e<=n){t.push(r);break}}return t.length>1?t:t[0]}}},410:(e,t)=>{t.getRandomNumber=(e,t)=>Math.random()*(t-e)+e,t.sortByValuesOfObject=e=>{const t={};return Object.entries(e).sort((([,e],[,t])=>e>t?1:t>e?-1:0)).forEach((([e,n])=>t[e]=n)),t},t.checkRates=e=>{let t=0;for(const[,n]of Object.entries(e))t+=n;return 100===t},t.round=e=>Number(e.toFixed())}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var c=t[r]={exports:{}};return e[r](c,c.exports,n),c.exports}(()=>{const e=n(598);let t,r,o=30,c=0,s=3e3,d=[],l=0,a=[];document.getElementById("coins").innerText=s,document.getElementById("time-left").innerText=o;let i={ssr:5.9,sr:10.8,r:17.3,c:66},u=new e(i);const m=[{rarity:"c",wordLength:3,score:3},{rarity:"r",wordLength:5,score:5},{rarity:"sr",wordLength:7,score:7},{rarity:"ssr",wordLength:10,score:15}];function g(){document.getElementById("time-left").innerText=o}function y(e){return m.find((e=>e.rarity===r))[e]}function h(){document.getElementById("coins").innerText=s}function f(){a.join("")===t?(document.getElementById("gacha-ball").innerText="Word matched! Press space for new word",l+=y("score")):document.getElementById("gacha-ball").innerText=`Incorrect word! Try again \nWord: ${t}`,a.length=0,document.getElementById("typed-word").innerText=" "}function E(e){if(" "===e.key)return r=u.getPullByRarity(),l+=y("score"),t=function(e){const t="bcdfghjklmnpqrstvwxyz";let n="";for(let r=0;r<e;r+=3)n+=t[Math.floor(21*Math.random())],n+="aeiou"[Math.floor(5*Math.random())],n+=t[Math.floor(21*Math.random())];return n}(y("wordLength")),void(document.getElementById("gacha-ball").innerText=`Rarity: ${r}, \nWord: ${t}`);if("Enter"===e.code)return void f();if("Backspace"===e.key)return 0!==a.length&&a.pop(),void(document.getElementById("typed-word").innerText=a.join(""));if("Delete"===e.key)return document.getElementById("gacha-ball").innerText=`Entire Sequence Cleared! \n Word: ${t}`,a.length=0,void(document.getElementById("typed-word").innerText=" ");const n=e.key.toLowerCase();if(/[a-z]/.test(n)){a.push(n);let e=a.join("");return document.getElementById("typed-word").innerText=e,e.length===t.length?void f():void 0}document.getElementById("gacha-ball").innerText=`Invalid! \nWord: ${t}`}document.getElementById("start-button").addEventListener("click",(function(){o=30+c,g(),document.getElementById("start-button").disabled=!0,document.getElementById("gacha-ball").innerText="Space to pull the gachapon!",document.addEventListener("keydown",E);let e=setInterval((()=>{!function(e){o--,g(),o<=0&&(clearInterval(e),document.removeEventListener("keydown",E),d.push(l),document.getElementById("highscores").innerHTML=d.map((e=>`<li>Score: ${e}</li>`)).join(""),s+=Math.floor(l/2),l=0,h(),document.getElementById("typed-word").innerText=" ",document.getElementById("start-button").disabled=!1)}(e)}),1e3)})),document.getElementById("buy-chance").addEventListener("click",(function(){s>=10&&(s-=10,h(),0===i.c&&0===i.r&&0===i.sr?document.getElementById("buy-speed").disabled=!0:i.c>0?(i.c-=5,i.r+=3,i.sr+=1.5,i.ssr+=.5,console.table(`first if: ${i}`),1===i.c&&(i.c=0,i.r+=1,u=new e(i)),u=new e(i),console.table(u)):i.r>0?(console.log(i.r),i.r-=3,console.log(i.r),console.log(i.sr),i.sr+=2.5,console.log(i.sr),console.log(i.ssr),i.ssr+=.5,console.log(i.ssr),console.table(`second if: ${i}`),u=new e(i),console.table(u)):(i.sr-=3,i.ssr+=3,console.table(`last if: ${i}`),u=new e(i),console.table(u)))})),document.getElementById("buy-speed").addEventListener("click",(function(){s>=20&&(s-=20,c+=10,h(),g())})),document.getElementById("reduce-word").addEventListener("click",(function(){s>=40&&(s-=40,h(),m.forEach((e=>{1!==e.wordLength&&(e.wordLength-=1)})))}))})()})();