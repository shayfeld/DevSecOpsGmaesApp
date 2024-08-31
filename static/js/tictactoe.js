document.addEventListener("DOMContentLoaded", function () {
  const board = document.getElementById("gameBoard");
  const status = document.getElementById("status");
  const resetBtn = document.getElementById("resetBtn");

  let currentPlayer = "X";
  let boardState = Array(9).fill(null);
  let gameActive = true;

  function createBoard() {
    board.innerHTML = "";
    boardState = Array(9).fill(null);
    gameActive = true;
    status.textContent = "Player X's Turn";

    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.dataset.index = i;
      cell.addEventListener("click", handleClick);
      board.appendChild(cell);
    }
  }

  function handleClick(event) {
    const index = event.target.dataset.index;
    if (!gameActive || boardState[index]) return;

    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
      status.textContent = `Player ${currentPlayer} Wins!`;
      gameActive = false;
    } else if (boardState.every((cell) => cell)) {
      status.textContent = "It's a Draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      status.textContent = `Player ${currentPlayer}'s Turn`;
    }
  }

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    return winPatterns.some((pattern) => {
      const [a, b, c] = pattern;
      return (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      );
    });
  }

  resetBtn.addEventListener("click", createBoard);

  createBoard(); // Initial board setup
});
