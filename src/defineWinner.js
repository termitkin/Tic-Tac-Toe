import { state } from "./state";

export const defineWinner = () => {
  state.winningCombinations.forEach(combination => {
    if (combination.every(cell => state.fieldCells[cell].innerHTML === "X")) {
      state.winner = true;
      state.message.innerHTML = "YOU win this round";
      const currentPlayerScore = Number(localStorage.getItem("playerScore"));
      state.playerScore.innerHTML = currentPlayerScore + 1;
      localStorage.setItem("playerScore", currentPlayerScore + 1);
    } else if (
      combination.every(cell => state.fieldCells[cell].innerHTML === "O")
    ) {
      state.winner = true;
      state.message.innerHTML = "BOT win this round";
      const currentBotScore = Number(localStorage.getItem("botScore"));
      state.botScore.innerHTML = currentBotScore + 1;
      localStorage.setItem("botScore", currentBotScore + 1);
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
