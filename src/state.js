export const state = {
  fieldCells: [...document.querySelectorAll(".field__cell")],
  playerScore: document.querySelector(".gamer__score"),
  botScore: document.querySelector(".bot__score"),
  refresh: document.querySelector("#refresh_JS"),
  again: document.querySelector("#again_JS"),
  message: document.querySelector("#message_JS"),
  winningCombinations: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],
  winner: false,
  botIsThinking: false
};
