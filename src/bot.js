import { getEmptyCells } from "./getEmptyCells";
import { botMakeMove } from "./botMakeMove";
import { defineWinner } from "./defineWinner";
import { state } from "./state";

export const bot = () => {
  state.message.innerHTML = "Bot is thinking..";
  if (getEmptyCells().length > 1 && state.winner === false) {
    const randomThinkingTime = Math.round(Math.random() * 2000);
    state.botThinking = true;
    setTimeout(() => {
      botMakeMove();
      defineWinner();
      state.botThinking = false;
    }, randomThinkingTime);
  } else {
    botMakeMove();
    defineWinner();
  }
};
