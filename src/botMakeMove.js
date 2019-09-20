import { getEmptyCells } from "./getEmptyCells";
import { state } from "./state";

export const botMakeMove = () => {
  let moveMaked = 0;
  const botCanWin = [];
  const playerCanWin = [];

  for (let i = 0; i < state.winnerCombinations.length; i += 1) {
    if (
      state.fieldCells[state.winnerCombinations[i][0]].innerHTML === "O" &&
      state.fieldCells[state.winnerCombinations[i][1]].innerHTML === "O" &&
      state.fieldCells[state.winnerCombinations[i][2]].innerHTML === ""
    ) {
      botCanWin.push([i, 2]);
      break;
    } else if (
      state.fieldCells[state.winnerCombinations[i][0]].innerHTML === "O" &&
      state.fieldCells[state.winnerCombinations[i][2]].innerHTML === "O" &&
      state.fieldCells[state.winnerCombinations[i][1]].innerHTML === ""
    ) {
      botCanWin.push([i, 1]);
      break;
    } else if (
      state.fieldCells[state.winnerCombinations[i][1]].innerHTML === "O" &&
      state.fieldCells[state.winnerCombinations[i][2]].innerHTML === "O" &&
      state.fieldCells[state.winnerCombinations[i][0]].innerHTML === ""
    ) {
      botCanWin.push([i, 0]);
      break;
    }
  }

  for (let i = 0; i < state.winnerCombinations.length; i += 1) {
    if (
      state.fieldCells[state.winnerCombinations[i][0]].innerHTML === "X" &&
      state.fieldCells[state.winnerCombinations[i][1]].innerHTML === "X" &&
      state.fieldCells[state.winnerCombinations[i][2]].innerHTML === ""
    ) {
      playerCanWin.push([i, 2]);
      break;
    } else if (
      state.fieldCells[state.winnerCombinations[i][0]].innerHTML === "X" &&
      state.fieldCells[state.winnerCombinations[i][2]].innerHTML === "X" &&
      state.fieldCells[state.winnerCombinations[i][1]].innerHTML === ""
    ) {
      playerCanWin.push([i, 1]);
      break;
    } else if (
      state.fieldCells[state.winnerCombinations[i][1]].innerHTML === "X" &&
      state.fieldCells[state.winnerCombinations[i][2]].innerHTML === "X" &&
      state.fieldCells[state.winnerCombinations[i][0]].innerHTML === ""
    ) {
      playerCanWin.push([i, 0]);
      break;
    }
  }

  if (botCanWin.length > 0) {
    state.fieldCells[
      state.winnerCombinations[botCanWin[0][0]][botCanWin[0][1]]
    ].innerHTML = "O";
    moveMaked = 1;
  } else if (playerCanWin.length > 0) {
    state.fieldCells[
      state.winnerCombinations[playerCanWin[0][0]][playerCanWin[0][1]]
    ].innerHTML = "O";
    moveMaked = 1;
  }

  if (moveMaked === 0) {
    const randomCellIndex = Math.round(Math.random() * 8);

    if (getEmptyCells().some(el => el === randomCellIndex)) {
      state.fieldCells[randomCellIndex].innerHTML = "O";
    } else if (getEmptyCells().length > 0) {
      botMakeMove();
    }
  }
};
