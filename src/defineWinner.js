import { state } from "./state";

export const defineWinner = () => {
  state.winnerCombinations.forEach(combination => {
    if (combination.every(cell => state.fieldCells[cell].innerHTML === "X")) {
      state.winner = true;
      state.message.innerHTML = "YOU win this round";
      const currentScore = Number(localStorage.getItem("playerScore")) + 1;
      state.playerScore.innerHTML = currentScore;
      localStorage.setItem("playerScore", currentScore);
    } else if (
      combination.every(cell => state.fieldCells[cell].innerHTML === "O")
    ) {
      state.winner = true;
      state.message.innerHTML = "BOT win this round";
      const currentScore = Number(localStorage.getItem("botScore")) + 1;
      state.botScore.innerHTML = currentScore;
      localStorage.setItem("botScore", currentScore);
    }
  });

  if (
    state.winner === false &&
    state.fieldCells.every(cell => cell.innerHTML !== "")
  ) {
    state.winner = true;
    state.message.innerHTML = "this round is a DRAW";
  } else if (state.winner === false) {
    state.message.innerHTML = "Your turn!";
  }
};
