import { emptyCellsList } from "./emptyCellsList";
import { state } from "./state";

export const botMakeMove = () => {
  const { fieldCells, winnerCombinations } = state;

  const canPlayerOrBotWin = sign => {
    const winnerPosition = {};
    for (let i = 0; i < winnerCombinations.length; i += 1) {
      if (
        fieldCells[winnerCombinations[i][1]].innerHTML === sign &&
        fieldCells[winnerCombinations[i][2]].innerHTML === sign &&
        fieldCells[winnerCombinations[i][0]].innerHTML === ""
      ) {
        winnerPosition.status = true;
        winnerPosition.winnerCombinationNumber = i;
        winnerPosition.positionInWinnerCombination = 0;
        break;
      } else if (
        fieldCells[winnerCombinations[i][0]].innerHTML === sign &&
        fieldCells[winnerCombinations[i][2]].innerHTML === sign &&
        fieldCells[winnerCombinations[i][1]].innerHTML === ""
      ) {
        winnerPosition.status = true;
        winnerPosition.winnerCombinationNumber = i;
        winnerPosition.positionInWinnerCombination = 1;
        break;
      } else if (
        fieldCells[winnerCombinations[i][0]].innerHTML === sign &&
        fieldCells[winnerCombinations[i][1]].innerHTML === sign &&
        fieldCells[winnerCombinations[i][2]].innerHTML === ""
      ) {
        winnerPosition.status = true;
        winnerPosition.winnerCombinationNumber = i;
        winnerPosition.positionInWinnerCombination = 2;
        break;
      }
    }
    return winnerPosition;
  };

  const makeMoveInRandomCell = () => {
    const randomCellIndex = Math.round(Math.random() * 8);

    if (emptyCellsList().some(cellIndex => cellIndex === randomCellIndex)) {
      fieldCells[randomCellIndex].innerHTML = "O";
    } else {
      makeMoveInRandomCell();
    }
  };

  const botCanWin = canPlayerOrBotWin("O");
  const playerCanWin = canPlayerOrBotWin("X");

  if (botCanWin.status === true) {
    fieldCells[
      winnerCombinations[botCanWin.winnerCombinationNumber][
        botCanWin.positionInWinnerCombination
      ]
    ].innerHTML = "O";
  } else if (playerCanWin.status === true) {
    fieldCells[
      winnerCombinations[playerCanWin.winnerCombinationNumber][
        playerCanWin.positionInWinnerCombination
      ]
    ].innerHTML = "O";
  } else {
    makeMoveInRandomCell();
  }
};
