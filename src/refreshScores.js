export const refreshScores = () => {
  localStorage.setItem("playerScore", 0);
  localStorage.setItem("botScore", 0);
  location.reload();
};
