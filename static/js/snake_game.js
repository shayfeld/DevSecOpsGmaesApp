// static/js/game.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let direction;
let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box,
};
let score = 0;
let game;

const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

document.addEventListener("keydown", directionControl);
restartBtn.addEventListener("click", restartGame);

function directionControl(event) {
  if (event.keyCode == 37 && direction != "RIGHT") direction = "LEFT";
  else if (event.keyCode == 38 && direction != "DOWN") direction = "UP";
  else if (event.keyCode == 39 && direction != "LEFT") direction = "RIGHT";
  else if (event.keyCode == 40 && direction != "UP") direction = "DOWN";
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "LEFT") snakeX -= box;
  if (direction == "RIGHT") snakeX += box;
  if (direction == "UP") snakeY -= box;
  if (direction == "DOWN") snakeY += box;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    scoreDisplay.innerText = score;
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box,
    };
  } else {
    snake.pop();
  }

  let newHead = { x: snakeX, y: snakeY };

  if (
    snakeX < 0 ||
    snakeX >= canvas.width ||
    snakeY < 0 ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    restartBtn.style.display = "block"; // Show restart button
  }

  snake.unshift(newHead);
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

function startGame() {
  score = 0;
  scoreDisplay.innerText = score;
  snake = [{ x: 9 * box, y: 10 * box }];
  direction = null;
  food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box,
  };
  restartBtn.style.display = "none"; // Hide restart button
  game = setInterval(drawGame, 100); // Start the game loop
}

function restartGame() {
  clearInterval(game);
  startGame(); // Restart the game
}

startGame(); // Initialize game on load
