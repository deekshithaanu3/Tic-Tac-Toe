const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const winConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');

  if (board[index] !== "" || !isGameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
    isGameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = `It's a draw! 🤝`;
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Your turn: ${currentPlayer}`;
  }
}

function checkWinner() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[b] === board[c]
    );
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = "X";
  statusText.textContent = `Your turn: ${currentPlayer}`;
  cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});
