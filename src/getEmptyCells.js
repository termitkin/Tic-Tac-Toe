import { state } from "./state";

export const getEmptyCells = () => {
  const emptyCells = [];
  state.fieldCells.forEach((el, ind) => {
    if (el.innerHTML === "") {
      emptyCells.push(ind);
    }
  });
  return emptyCells;
};
