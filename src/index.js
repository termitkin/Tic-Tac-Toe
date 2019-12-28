import { bot } from "./bot";
import { defineWinner } from "./defineWinner";
import { refreshScores } from "./refreshScores";
import { resetField } from "./resetField";
import { state } from "./state";

if (localStorage.length > 0) {
  state.playerScore.innerHTML = localStorage.getItem("playerScore");
  state.botScore.innerHTML = localStorage.getItem("botScore");
} else {
  localStorage.setItem("playerScore", 0);
  localStorage.setItem("botScore", 0);
  state.playerScore.innerHTML = localStorage.getItem("playerScore");
  state.botScore.innerHTML = localStorage.getItem("botScore");
}

const firstMove = Math.random();
if (firstMove > 0.5) {
  bot();
} else {
  state.message.innerHTML = "Your turn!";
}

const makeMove = e => {
  if (
    e.target.innerHTML === "" &&
    state.winner === false &&
    state.botIsThinking === false
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
state.fieldCells.forEach(cell => {
  cell.addEventListener("click", e => makeMove(e));
});
