document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 400;

  const paddleWidth = 10;
  const paddleHeight = 100;
  const ballSize = 10;
  let leftPaddle = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 5,
  };
  let rightPaddle = {
    x: canvas.width - paddleWidth - 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 5,
  };
  let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: ballSize,
    dx: 5,
    dy: 3,
  };

  let leftScore = 0;
  let rightScore = 0;
  let gameRunning = false;

  const startBtn = document.getElementById("startBtn");
  const restartBtn = document.getElementById("restartBtn");
  const scoreDisplay = document.getElementById("score");
  const winnerMessage = document.getElementById("winnerMessage");

  function drawPaddle(paddle) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(leftPaddle);
    drawPaddle(rightPaddle);
    drawBall();

    // Ball movement
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top and bottom walls
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
      ball.dy = -ball.dy;
    }

    // Ball collision with paddles
    if (
      (ball.x - ball.size < leftPaddle.x + leftPaddle.width &&
        ball.y > leftPaddle.y &&
        ball.y < leftPaddle.y + leftPaddle.height) ||
      (ball.x + ball.size > rightPaddle.x &&
        ball.y > rightPaddle.y &&
        ball.y < rightPaddle.y + rightPaddle.height)
    ) {
      ball.dx = -ball.dx;
    }

    // Ball out of bounds
    if (ball.x - ball.size < 0) {
      rightScore++;
      resetBall();
    } else if (ball.x + ball.size > canvas.width) {
      leftScore++;
      resetBall();
    }
    scoreDisplay.textContent = `${leftScore} - ${rightScore}`;
    // Check for winner
    if (leftScore >= 3 || rightScore >= 3) {
      endGame();
      return;
    }

    // Move paddles
    if (leftPaddle.upPressed && leftPaddle.y > 0) {
      leftPaddle.y -= leftPaddle.dy;
    }
    if (
      leftPaddle.downPressed &&
      leftPaddle.y < canvas.height - leftPaddle.height
    ) {
      leftPaddle.y += leftPaddle.dy;
    }
    if (rightPaddle.upPressed && rightPaddle.y > 0) {
      rightPaddle.y -= rightPaddle.dy;
    }
    if (
      rightPaddle.downPressed &&
      rightPaddle.y < canvas.height - rightPaddle.height
    ) {
      rightPaddle.y += rightPaddle.dy;
    }

    requestAnimationFrame(draw);
  }

  function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
  }

  function startGame() {
    gameRunning = true;
    startBtn.style.display = "none";
    restartBtn.style.display = "none";
    winnerMessage.classList.add("hidden");
    draw();
  }

  function endGame() {
    gameRunning = false;
    startBtn.style.display = "none";
    restartBtn.style.display = "block";
    winnerMessage.classList.remove("hidden");
    winnerMessage.textContent =
      leftScore >= 3 ? "Player 1 Wins!" : "Player 2 Wins!";
  }

  function restartGame() {
    leftScore = 0;
    rightScore = 0;
    scoreDisplay.textContent = "0 - 0";
    startGame();
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowUp") {
      rightPaddle.upPressed = true;
    }
    if (e.key === "ArrowDown") {
      rightPaddle.downPressed = true;
    }
    if (e.key === "w") {
      leftPaddle.upPressed = true;
    }
    if (e.key === "s") {
      leftPaddle.downPressed = true;
    }
  }

  function handleKeyUp(e) {
    if (e.key === "ArrowUp") {
      rightPaddle.upPressed = false;
    }
    if (e.key === "ArrowDown") {
      rightPaddle.downPressed = false;
    }
    if (e.key === "w") {
      leftPaddle.upPressed = false;
    }
    if (e.key === "s") {
      leftPaddle.downPressed = false;
    }
  }

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
  startBtn.addEventListener("click", startGame);
  restartBtn.addEventListener("click", restartGame);
});
