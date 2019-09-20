import { bot } from "./bot";
import { defineWinner } from "./defineWinner";
import { refreshScores } from "./refreshScores";
import { resetField } from "./resetField";
import { state } from "./state";

(function() {
  if (localStorage.length > 0) {
    state.gamerScore.innerHTML = localStorage.getItem("gamerScore");
    state.botScore.innerHTML = localStorage.getItem("botScore");
  } else {
    localStorage.setItem("gamerScore", 0);
    localStorage.setItem("botScore", 0);
  }
})();

const firstMove = Math.round(Math.random());
if (firstMove > 0) {
  bot();
} else {
  state.message.innerHTML = "Your turn!";
}

const makeMove = e => {
  if (
    e.target.innerHTML === "" &&
    state.winner === false &&
    state.botThinking === false
  ) {
    e.target.innerHTML = "X";

    defineWinner();

    if (state.winner === false) {
      bot();
    }
  }
};

state.refresh.addEventListener("click", refreshScores);
state.again.addEventListener("click", resetField);
state.fieldCells.forEach(el => {
  el.addEventListener("click", makeMove);
});
