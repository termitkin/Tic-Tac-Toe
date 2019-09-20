export const refreshScores = () => {
  localStorage.setItem("gamerScore", 0);
  localStorage.setItem("botScore", 0);
  location.reload();
};
