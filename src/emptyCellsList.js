import { state } from "./state";

export const emptyCellsList = () => {
  const emptyCells = [];
  state.fieldCells.forEach((cell, index) => {
    if (cell.innerHTML === "") {
      emptyCells.push(index);
    }
  });
  return emptyCells;
};
