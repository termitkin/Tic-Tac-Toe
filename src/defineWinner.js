import { state } from "./state";

export const defineWinner = () => {
  state.winnerCombinations.forEach(el => {
    if (
      el.every(
        elem =>
          state.fieldCells[elem].innerHTML !== "" &&
          state.fieldCells[elem].innerHTML === "X"
      )
    ) {
      state.winner = true;
      state.message.innerHTML = "YOU win this round";
      const currentScore = Number(localStorage.getItem("playerScore")) + 1;
      localStorage.setItem("playerScore", currentScore);
      state.playerScore.innerHTML = localStorage.getItem("playerScore");
    } else if (
      el.every(
        elem =>
          state.fieldCells[elem].innerHTML !== "" &&
          state.fieldCells[elem].innerHTML === "O"
      )
    ) {
      state.winner = true;
      state.message.innerHTML = "BOT win this round";
      const currentScore = Number(localStorage.getItem("botScore")) + 1;
      localStorage.setItem("botScore", currentScore);
      state.botScore.innerHTML = localStorage.getItem("botScore");
    }
  });

  if (
    state.winner === false &&
    state.fieldCells.every(el => el.innerHTML !== "")
  ) {
    state.winner = true;
    state.message.innerHTML = "this round is a DRAW";
  } else if (state.winner === false) {
    state.message.innerHTML = "Your turn!";
  }
};
