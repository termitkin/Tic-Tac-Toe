parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"dm40":[function(require,module,exports) {
"use strict";function e(e){return o(e)||t(e)||r()}function r(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function t(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function o(e){if(Array.isArray(e)){for(var r=0,t=new Array(e.length);r<e.length;r++)t[r]=e[r];return t}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.state=void 0;var n={fieldCells:e(document.querySelectorAll(".field__cell")),gamerScore:document.querySelector(".gamer__score"),botScore:document.querySelector(".bot__score"),refresh:document.querySelector("#refresh_JS"),again:document.querySelector("#again_JS"),message:document.querySelector("#message_JS"),winnerCombinations:[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],winner:!1,botThinking:!1};exports.state=n;
},{}],"Wa/3":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getEmptyCells=void 0;var e=require("./state"),t=function(){var t=[];return e.state.fieldCells.forEach(function(e,r){""===e.innerHTML&&t.push(r)}),t};exports.getEmptyCells=t;
},{"./state":"dm40"}],"BLJh":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.botMakeMove=void 0;var e=require("./getEmptyCells"),n=require("./state"),t=function t(){for(var i=0,s=[],a=[],l=0;l<n.state.winnerCombinations.length;l+=1){if("O"===n.state.fieldCells[n.state.winnerCombinations[l][0]].innerHTML&&"O"===n.state.fieldCells[n.state.winnerCombinations[l][1]].innerHTML&&""===n.state.fieldCells[n.state.winnerCombinations[l][2]].innerHTML){s.push([l,2]);break}if("O"===n.state.fieldCells[n.state.winnerCombinations[l][0]].innerHTML&&"O"===n.state.fieldCells[n.state.winnerCombinations[l][2]].innerHTML&&""===n.state.fieldCells[n.state.winnerCombinations[l][1]].innerHTML){s.push([l,1]);break}if("O"===n.state.fieldCells[n.state.winnerCombinations[l][1]].innerHTML&&"O"===n.state.fieldCells[n.state.winnerCombinations[l][2]].innerHTML&&""===n.state.fieldCells[n.state.winnerCombinations[l][0]].innerHTML){s.push([l,0]);break}}for(var r=0;r<n.state.winnerCombinations.length;r+=1){if("X"===n.state.fieldCells[n.state.winnerCombinations[r][0]].innerHTML&&"X"===n.state.fieldCells[n.state.winnerCombinations[r][1]].innerHTML&&""===n.state.fieldCells[n.state.winnerCombinations[r][2]].innerHTML){a.push([r,2]);break}if("X"===n.state.fieldCells[n.state.winnerCombinations[r][0]].innerHTML&&"X"===n.state.fieldCells[n.state.winnerCombinations[r][2]].innerHTML&&""===n.state.fieldCells[n.state.winnerCombinations[r][1]].innerHTML){a.push([r,1]);break}if("X"===n.state.fieldCells[n.state.winnerCombinations[r][1]].innerHTML&&"X"===n.state.fieldCells[n.state.winnerCombinations[r][2]].innerHTML&&""===n.state.fieldCells[n.state.winnerCombinations[r][0]].innerHTML){a.push([r,0]);break}}if(s.length>0?(n.state.fieldCells[n.state.winnerCombinations[s[0][0]][s[0][1]]].innerHTML="O",i=1):a.length>0&&(n.state.fieldCells[n.state.winnerCombinations[a[0][0]][a[0][1]]].innerHTML="O",i=1),0===i){var o=Math.round(8*Math.random());(0,e.getEmptyCells)().some(function(e){return e===o})?n.state.fieldCells[o].innerHTML="O":(0,e.getEmptyCells)().length>0&&t()}};exports.botMakeMove=t;
},{"./getEmptyCells":"Wa/3","./state":"dm40"}],"zqUz":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.defineWinner=void 0;var e=require("./state"),t=function(){e.state.winnerCombinations.forEach(function(t){if(t.every(function(t){return""!==e.state.fieldCells[t].innerHTML&&"X"===e.state.fieldCells[t].innerHTML})){e.state.winner=!0,e.state.message.innerHTML="YOU win this round";var r=Number(localStorage.getItem("gamerScore"))+1;localStorage.setItem("gamerScore",r),e.state.gamerScore.innerHTML=localStorage.getItem("gamerScore")}else if(t.every(function(t){return""!==e.state.fieldCells[t].innerHTML&&"O"===e.state.fieldCells[t].innerHTML})){e.state.winner=!0,e.state.message.innerHTML="BOT win this round";var n=Number(localStorage.getItem("botScore"))+1;localStorage.setItem("botScore",n),e.state.botScore.innerHTML=localStorage.getItem("botScore")}}),!1===e.state.winner&&e.state.fieldCells.every(function(e){return""!==e.innerHTML})?(e.state.winner=!0,e.state.message.innerHTML="this round is a DRAW"):!1===e.state.winner&&(e.state.message.innerHTML="Your turn!")};exports.defineWinner=t;
},{"./state":"dm40"}],"nRmQ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.bot=void 0;var e=require("./getEmptyCells"),t=require("./botMakeMove"),n=require("./defineWinner"),i=require("./state"),r=function(){if(i.state.message.innerHTML="Bot is thinking..",(0,e.getEmptyCells)().length>1&&!1===i.state.winner){var r=Math.round(2e3*Math.random());i.state.botThinking=!0,setTimeout(function(){(0,t.botMakeMove)(),(0,n.defineWinner)(),i.state.botThinking=!1},r)}else(0,t.botMakeMove)(),(0,n.defineWinner)()};exports.bot=r;
},{"./getEmptyCells":"Wa/3","./botMakeMove":"BLJh","./defineWinner":"zqUz","./state":"dm40"}],"LQQK":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.refreshScores=void 0;var e=function(){localStorage.setItem("gamerScore",0),localStorage.setItem("botScore",0),location.reload()};exports.refreshScores=e;
},{}],"0Dwv":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.resetField=void 0;var e=function(){location.reload()};exports.resetField=e;
},{}],"Focm":[function(require,module,exports) {
"use strict";var e=require("./bot"),t=require("./defineWinner"),r=require("./refreshScores"),a=require("./resetField"),n=require("./state");localStorage.length>0?(n.state.gamerScore.innerHTML=localStorage.getItem("gamerScore"),n.state.botScore.innerHTML=localStorage.getItem("botScore")):(localStorage.setItem("gamerScore",0),localStorage.setItem("botScore",0));var i=Math.round(Math.random());i>0?(0,e.bot)():n.state.message.innerHTML="Your turn!";var o=function(r){""===r.target.innerHTML&&!1===n.state.winner&&!1===n.state.botThinking&&(r.target.innerHTML="X",(0,t.defineWinner)(),!1===n.state.winner&&(0,e.bot)())};n.state.refresh.addEventListener("click",r.refreshScores),n.state.again.addEventListener("click",a.resetField),n.state.fieldCells.forEach(function(e){e.addEventListener("click",o)});
},{"./bot":"nRmQ","./defineWinner":"zqUz","./refreshScores":"LQQK","./resetField":"0Dwv","./state":"dm40"}]},{},["Focm"], null)
//# sourceMappingURL=/src.e3311300.js.map