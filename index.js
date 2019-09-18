document.addEventListener("DOMContentLoaded", () => {
  const fieldCells = [...document.querySelectorAll(".field__cell")];
  const gamerScore = document.querySelector(".gamer__score");
  const botScore = document.querySelector(".bot__score");
  const refresh_JS = document.querySelector("#refresh_JS");
  const again_JS = document.querySelector("#again_JS");
  const message = document.querySelector("#message_JS");
  const firstMove = Math.round(Math.random());
  const winnerCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let winner = null;
  let botThinking = false;

  (function() {
    if (typeof Storage !== "undefined") {
      gamerScore.innerHTML = localStorage.getItem("gamerScore");
      botScore.innerHTML = localStorage.getItem("botScore");
    } else {
      localStorage.setItem("gamerScore", 0);
      localStorage.setItem("botScore", 0);
    }
  })();

  const resetField = () => {
    location.reload();
  };

  const refreshScores = () => {
    localStorage.setItem("gamerScore", 0);
    localStorage.setItem("botScore", 0);
    location.reload();
  };

  const defineWinner = () => {
    winnerCombinations.forEach(el => {
      if (
        el.every(
          elem =>
            fieldCells[elem].innerHTML !== "" &&
            fieldCells[elem].innerHTML === "X"
        )
      ) {
        winner = "X";
        message.innerHTML = "YOU win this round";
        let currentScore = Number(localStorage.getItem("gamerScore")) + 1;
        localStorage.setItem("gamerScore", currentScore);
        gamerScore.innerHTML = localStorage.getItem("gamerScore");
      } else if (
        el.every(
          elem =>
            fieldCells[elem].innerHTML !== "" &&
            fieldCells[elem].innerHTML === "O"
        )
      ) {
        winner = "O";
        message.innerHTML = "BOT win this round";
        let currentScore = Number(localStorage.getItem("botScore")) + 1;
        localStorage.setItem("botScore", currentScore);
        botScore.innerHTML = localStorage.getItem("botScore");
      }
    });

    if (winner === null && fieldCells.every(el => el.innerHTML !== "")) {
      winner = "draw";
      message.innerHTML = "this round is a DRAW";
    }
  };

  const getEmptyCells = () => {
    const emptyCells = [];
    fieldCells.forEach((el, ind) => {
      if (el.innerHTML === "") {
        emptyCells.push(ind);
      }
    });
    return emptyCells;
  };

  const botMakeMove = () => {
    let moveMaked = 0;
    let botCanWin = [];
    let playerCanWin = [];

    for (let i = 0; i < winnerCombinations.length; i += 1) {
      if (
        fieldCells[winnerCombinations[i][0]].innerHTML === "O" &&
        fieldCells[winnerCombinations[i][1]].innerHTML === "O" &&
        fieldCells[winnerCombinations[i][2]].innerHTML === ""
      ) {
        botCanWin.push([i, 2]);
        break;
      } else if (
        fieldCells[winnerCombinations[i][0]].innerHTML === "O" &&
        fieldCells[winnerCombinations[i][2]].innerHTML === "O" &&
        fieldCells[winnerCombinations[i][1]].innerHTML === ""
      ) {
        botCanWin.push([i, 1]);
        break;
      } else if (
        fieldCells[winnerCombinations[i][1]].innerHTML === "O" &&
        fieldCells[winnerCombinations[i][2]].innerHTML === "O" &&
        fieldCells[winnerCombinations[i][0]].innerHTML === ""
      ) {
        botCanWin.push([i, 0]);
        break;
      }
    }

    for (let i = 0; i < winnerCombinations.length; i += 1) {
      if (
        fieldCells[winnerCombinations[i][0]].innerHTML === "X" &&
        fieldCells[winnerCombinations[i][1]].innerHTML === "X" &&
        fieldCells[winnerCombinations[i][2]].innerHTML === ""
      ) {
        playerCanWin.push([i, 2]);
        break;
      } else if (
        fieldCells[winnerCombinations[i][0]].innerHTML === "X" &&
        fieldCells[winnerCombinations[i][2]].innerHTML === "X" &&
        fieldCells[winnerCombinations[i][1]].innerHTML === ""
      ) {
        playerCanWin.push([i, 1]);
        break;
      } else if (
        fieldCells[winnerCombinations[i][1]].innerHTML === "X" &&
        fieldCells[winnerCombinations[i][2]].innerHTML === "X" &&
        fieldCells[winnerCombinations[i][0]].innerHTML === ""
      ) {
        playerCanWin.push([i, 0]);
        break;
      }
    }

    if (botCanWin.length > 0) {
      fieldCells[
        winnerCombinations[botCanWin[0][0]][botCanWin[0][1]]
      ].innerHTML = "O";
      moveMaked = 1;
    } else if (playerCanWin.length > 0) {
      fieldCells[
        winnerCombinations[playerCanWin[0][0]][playerCanWin[0][1]]
      ].innerHTML = "O";
      moveMaked = 1;
    }

    if (moveMaked === 0) {
      const randomCellIndex = Math.round(Math.random() * 8);

      if (getEmptyCells().some(el => el === randomCellIndex)) {
        fieldCells[randomCellIndex].innerHTML = "O";
      } else if (getEmptyCells().length > 0) {
        botMakeMove();
      }
    }
  };

  const bot = () => {
    message.innerHTML = "Bot is thinking..";
    if (getEmptyCells().length > 1 && winner === null) {
      const randomThinkingTime = Math.round(Math.random() * 2000);
      botThinking = true;
      setTimeout(() => {
        botMakeMove();
        botThinking = false;
        message.innerHTML = "Your turn!";
        defineWinner();
      }, randomThinkingTime);
    } else {
      botMakeMove();
      defineWinner();
    }
  };

  if (firstMove > 0) {
    bot();
  } else {
    message.innerHTML = "Your turn!";
  }

  const makeMove = e => {
    if (e.target.innerHTML === "" && winner === null && botThinking === false) {
      e.target.innerHTML = "X";

      defineWinner();

      if (winner === null) {
        bot();
      }
    }
  };

  refresh_JS.addEventListener("click", refreshScores);
  again_JS.addEventListener("click", resetField);

  fieldCells.forEach(el => {
    el.addEventListener("click", makeMove);
  });
});
