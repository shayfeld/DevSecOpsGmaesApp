document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 480;
  canvas.height = 320;

  let ball = {};
  let paddle = {};
  let bricks = [];
  const brickRowCount = 3;
  const brickColumnCount = 5;
  const brickWidth = 75;
  const brickHeight = 20;
  const brickPadding = 10;
  const brickOffsetTop = 30;
  const brickOffsetLeft = 30;

  let score = 0;
  let gameRunning = false;

  const startBtn = document.getElementById("startBtn");
  const scoreDisplay = document.getElementById("score");

  if (!startBtn || !scoreDisplay) {
    console.error("One or more DOM elements are missing.");
    return;
  }

  document.addEventListener("keydown", movePaddle);
  startBtn.addEventListener("click", startGame);

  function initializeGame() {
    // Initialize ball
    ball = {
      x: canvas.width / 2,
      y: canvas.height - 30,
      radius: 10,
      dx: 2, // Set ball speed
      dy: -2, // Set ball speed
    };

    // Initialize paddle
    paddle = {
      width: 75,
      height: 10,
      x: (canvas.width - 75) / 2,
      speed: 20, // Increased speed of paddle movement
    };

    // Initialize bricks
    createBricks();
  }

  function createBricks() {
    bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        const x = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const y = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r] = { x, y, status: 1 };
      }
    }
  }

  function movePaddle(e) {
    if (e.key === "ArrowRight" && paddle.x < canvas.width - paddle.width) {
      paddle.x += paddle.speed;
    } else if (e.key === "ArrowLeft" && paddle.x > 0) {
      paddle.x -= paddle.speed;
    }
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(
      paddle.x,
      canvas.height - paddle.height,
      paddle.width,
      paddle.height
    );
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function drawBricks() {
    bricks.forEach((column) => {
      column.forEach((brick) => {
        if (brick.status === 1) {
          ctx.beginPath();
          ctx.rect(brick.x, brick.y, brickWidth, brickHeight);
          ctx.fillStyle = "#0095DD";
          ctx.fill();
          ctx.closePath();
        }
      });
    });
  }

  function collisionDetection() {
    let allBricksCleared = true;
    bricks.forEach((column) => {
      column.forEach((brick) => {
        if (brick.status === 1) {
          allBricksCleared = false; // Found at least one brick
          if (
            ball.x > brick.x &&
            ball.x < brick.x + brickWidth &&
            ball.y > brick.y &&
            ball.y < brick.y + brickHeight
          ) {
            ball.dy = -ball.dy;
            brick.status = 0;
            score++;
            scoreDisplay.textContent = score;
          }
        }
      });
    });

    if (allBricksCleared) {
      createBricks(); // Create new set of bricks
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    if (gameRunning) {
      drawBall(); // Only draw ball if game is running
    }
    drawPaddle();
    collisionDetection();

    if (
      ball.x + ball.dx > canvas.width - ball.radius ||
      ball.x + ball.dx < ball.radius
    ) {
      ball.dx = -ball.dx;
    }
    if (ball.y + ball.dy < ball.radius) {
      ball.dy = -ball.dy;
    } else if (ball.y + ball.dy > canvas.height - ball.radius) {
      if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
        ball.dy = -ball.dy;
      } else {
        gameOver();
        return;
      }
    }

    ball.x += ball.dx;
    ball.y += ball.dy;

    requestAnimationFrame(draw);
  }

  function gameOver() {
    gameRunning = false;
    startBtn.style.display = "block";
    ball.dx = 0; // Stop ball movement
    ball.dy = 0; // Stop ball movement
  }

  function startGame() {
    gameRunning = true;
    score = 0;
    scoreDisplay.textContent = score;
    startBtn.style.display = "none"; // Hide button when the game starts
    initializeGame(); // Initialize game state
    draw();
  }

  createBricks(); // Initial brick drawing and game setup
});
