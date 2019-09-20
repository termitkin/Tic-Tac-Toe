// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.state = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var state = {
  fieldCells: _toConsumableArray(document.querySelectorAll(".field__cell")),
  gamerScore: document.querySelector(".gamer__score"),
  botScore: document.querySelector(".bot__score"),
  refresh: document.querySelector("#refresh_JS"),
  again: document.querySelector("#again_JS"),
  message: document.querySelector("#message_JS"),
  winnerCombinations: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
  winner: false,
  botThinking: false
};
exports.state = state;
},{}],"getEmptyCells.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEmptyCells = void 0;

var _state = require("./state");

var getEmptyCells = function getEmptyCells() {
  var emptyCells = [];

  _state.state.fieldCells.forEach(function (el, ind) {
    if (el.innerHTML === "") {
      emptyCells.push(ind);
    }
  });

  return emptyCells;
};

exports.getEmptyCells = getEmptyCells;
},{"./state":"state.js"}],"botMakeMove.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.botMakeMove = void 0;

var _getEmptyCells = require("./getEmptyCells");

var _state = require("./state");

var botMakeMove = function botMakeMove() {
  var moveMaked = 0;
  var botCanWin = [];
  var playerCanWin = [];

  for (var i = 0; i < _state.state.winnerCombinations.length; i += 1) {
    if (_state.state.fieldCells[_state.state.winnerCombinations[i][0]].innerHTML === "O" && _state.state.fieldCells[_state.state.winnerCombinations[i][1]].innerHTML === "O" && _state.state.fieldCells[_state.state.winnerCombinations[i][2]].innerHTML === "") {
      botCanWin.push([i, 2]);
      break;
    } else if (_state.state.fieldCells[_state.state.winnerCombinations[i][0]].innerHTML === "O" && _state.state.fieldCells[_state.state.winnerCombinations[i][2]].innerHTML === "O" && _state.state.fieldCells[_state.state.winnerCombinations[i][1]].innerHTML === "") {
      botCanWin.push([i, 1]);
      break;
    } else if (_state.state.fieldCells[_state.state.winnerCombinations[i][1]].innerHTML === "O" && _state.state.fieldCells[_state.state.winnerCombinations[i][2]].innerHTML === "O" && _state.state.fieldCells[_state.state.winnerCombinations[i][0]].innerHTML === "") {
      botCanWin.push([i, 0]);
      break;
    }
  }

  for (var _i = 0; _i < _state.state.winnerCombinations.length; _i += 1) {
    if (_state.state.fieldCells[_state.state.winnerCombinations[_i][0]].innerHTML === "X" && _state.state.fieldCells[_state.state.winnerCombinations[_i][1]].innerHTML === "X" && _state.state.fieldCells[_state.state.winnerCombinations[_i][2]].innerHTML === "") {
      playerCanWin.push([_i, 2]);
      break;
    } else if (_state.state.fieldCells[_state.state.winnerCombinations[_i][0]].innerHTML === "X" && _state.state.fieldCells[_state.state.winnerCombinations[_i][2]].innerHTML === "X" && _state.state.fieldCells[_state.state.winnerCombinations[_i][1]].innerHTML === "") {
      playerCanWin.push([_i, 1]);
      break;
    } else if (_state.state.fieldCells[_state.state.winnerCombinations[_i][1]].innerHTML === "X" && _state.state.fieldCells[_state.state.winnerCombinations[_i][2]].innerHTML === "X" && _state.state.fieldCells[_state.state.winnerCombinations[_i][0]].innerHTML === "") {
      playerCanWin.push([_i, 0]);
      break;
    }
  }

  if (botCanWin.length > 0) {
    _state.state.fieldCells[_state.state.winnerCombinations[botCanWin[0][0]][botCanWin[0][1]]].innerHTML = "O";
    moveMaked = 1;
  } else if (playerCanWin.length > 0) {
    _state.state.fieldCells[_state.state.winnerCombinations[playerCanWin[0][0]][playerCanWin[0][1]]].innerHTML = "O";
    moveMaked = 1;
  }

  if (moveMaked === 0) {
    var randomCellIndex = Math.round(Math.random() * 8);

    if ((0, _getEmptyCells.getEmptyCells)().some(function (el) {
      return el === randomCellIndex;
    })) {
      _state.state.fieldCells[randomCellIndex].innerHTML = "O";
    } else if ((0, _getEmptyCells.getEmptyCells)().length > 0) {
      botMakeMove();
    }
  }
};

exports.botMakeMove = botMakeMove;
},{"./getEmptyCells":"getEmptyCells.js","./state":"state.js"}],"defineWinner.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineWinner = void 0;

var _state = require("./state");

var defineWinner = function defineWinner() {
  _state.state.winnerCombinations.forEach(function (el) {
    if (el.every(function (elem) {
      return _state.state.fieldCells[elem].innerHTML !== "" && _state.state.fieldCells[elem].innerHTML === "X";
    })) {
      _state.state.winner = true;
      _state.state.message.innerHTML = "YOU win this round";
      var currentScore = Number(localStorage.getItem("gamerScore")) + 1;
      localStorage.setItem("gamerScore", currentScore);
      _state.state.gamerScore.innerHTML = localStorage.getItem("gamerScore");
    } else if (el.every(function (elem) {
      return _state.state.fieldCells[elem].innerHTML !== "" && _state.state.fieldCells[elem].innerHTML === "O";
    })) {
      _state.state.winner = true;
      _state.state.message.innerHTML = "BOT win this round";

      var _currentScore = Number(localStorage.getItem("botScore")) + 1;

      localStorage.setItem("botScore", _currentScore);
      _state.state.botScore.innerHTML = localStorage.getItem("botScore");
    }
  });

  if (_state.state.winner === false && _state.state.fieldCells.every(function (el) {
    return el.innerHTML !== "";
  })) {
    _state.state.winner = true;
    _state.state.message.innerHTML = "this round is a DRAW";
  } else if (_state.state.winner === false) {
    _state.state.message.innerHTML = "Your turn!";
  }
};

exports.defineWinner = defineWinner;
},{"./state":"state.js"}],"bot.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bot = void 0;

var _getEmptyCells = require("./getEmptyCells");

var _botMakeMove = require("./botMakeMove");

var _defineWinner = require("./defineWinner");

var _state = require("./state");

var bot = function bot() {
  _state.state.message.innerHTML = "Bot is thinking..";

  if ((0, _getEmptyCells.getEmptyCells)().length > 1 && _state.state.winner === false) {
    var randomThinkingTime = Math.round(Math.random() * 2000);
    _state.state.botThinking = true;
    setTimeout(function () {
      (0, _botMakeMove.botMakeMove)();
      (0, _defineWinner.defineWinner)();
      _state.state.botThinking = false;
    }, randomThinkingTime);
  } else {
    (0, _botMakeMove.botMakeMove)();
    (0, _defineWinner.defineWinner)();
  }
};

exports.bot = bot;
},{"./getEmptyCells":"getEmptyCells.js","./botMakeMove":"botMakeMove.js","./defineWinner":"defineWinner.js","./state":"state.js"}],"refreshScores.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refreshScores = void 0;

var refreshScores = function refreshScores() {
  localStorage.setItem("gamerScore", 0);
  localStorage.setItem("botScore", 0);
  location.reload();
};

exports.refreshScores = refreshScores;
},{}],"resetField.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetField = void 0;

var resetField = function resetField() {
  location.reload();
};

exports.resetField = resetField;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _bot = require("./bot");

var _defineWinner = require("./defineWinner");

var _refreshScores = require("./refreshScores");

var _resetField = require("./resetField");

var _state = require("./state");

(function () {
  if (localStorage.length > 0) {
    _state.state.gamerScore.innerHTML = localStorage.getItem("gamerScore");
    _state.state.botScore.innerHTML = localStorage.getItem("botScore");
  } else {
    localStorage.setItem("gamerScore", 0);
    localStorage.setItem("botScore", 0);
  }
})();

var firstMove = Math.round(Math.random());

if (firstMove > 0) {
  (0, _bot.bot)();
} else {
  _state.state.message.innerHTML = "Your turn!";
}

var makeMove = function makeMove(e) {
  if (e.target.innerHTML === "" && _state.state.winner === false && _state.state.botThinking === false) {
    e.target.innerHTML = "X";
    (0, _defineWinner.defineWinner)();

    if (_state.state.winner === false) {
      (0, _bot.bot)();
    }
  }
};

_state.state.refresh.addEventListener("click", _refreshScores.refreshScores);

_state.state.again.addEventListener("click", _resetField.resetField);

_state.state.fieldCells.forEach(function (el) {
  el.addEventListener("click", makeMove);
});
},{"./bot":"bot.js","./defineWinner":"defineWinner.js","./refreshScores":"refreshScores.js","./resetField":"resetField.js","./state":"state.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54374" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map