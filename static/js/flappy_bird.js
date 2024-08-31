const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 320;
canvas.height = 480;

let bird = {
  x: 50,
  y: 150,
  width: 20,
  height: 20,
  gravity: 0.6,
  lift: -10, // Lowered lift for smaller jump
  velocity: 0,
};
let pipes = [];
let score = 0;
let gameRunning = false;
const pipeWidth = 40;
const pipeGap = 150; // Increased gap to make it easier
const pipeGapMin = 80; // Minimum gap to ensure it's not too small
const startBtn = document.getElementById("startBtn");
const scoreDisplay = document.getElementById("score");

document.addEventListener("keydown", flap);
startBtn.addEventListener("click", startGame);

function flap() {
  if (gameRunning) {
    bird.velocity = bird.lift;
  }
}

function startGame() {
  gameRunning = true;
  pipes = [];
  bird.y = 150;
  bird.velocity = 0;
  score = 0;
  scoreDisplay.textContent = score;
  pipes.push(createPipe());
  startBtn.style.display = "none";
  gameLoop();
}

function createPipe() {
  const pipeY = Math.floor(Math.random() * (canvas.height - pipeGap - 40)) + 20;
  return { x: canvas.width, y: pipeY };
}

function drawBird() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
  pipes.forEach((pipe) => {
    ctx.fillStyle = "green";
    // Top pipe
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.y);
    // Bottom pipe
    ctx.fillRect(
      pipe.x,
      pipe.y + pipeGap,
      pipeWidth,
      canvas.height - (pipe.y + pipeGap)
    );
  });
}

function updateBird() {
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  if (bird.y + bird.height > canvas.height || bird.y < 0) {
    gameOver();
  }
}

function updatePipes() {
  pipes.forEach((pipe) => {
    pipe.x -= 1; // Slowed down pipe movement

    // Check for collision with bird
    if (
      pipe.x < bird.x + bird.width &&
      pipe.x + pipeWidth > bird.x &&
      (bird.y < pipe.y || bird.y + bird.height > pipe.y + pipeGap)
    ) {
      gameOver();
    }

    // Score update
    if (pipe.x + pipeWidth < bird.x && !pipe.passed) {
      score++;
      scoreDisplay.textContent = score;
      pipe.passed = true;
    }
  });

  // Add new pipes
  if (pipes.length > 0 && pipes[pipes.length - 1].x < canvas.width - 250) {
    // Increased distance before adding new pipe
    pipes.push(createPipe());
  }

  // Remove old pipes
  if (pipes.length > 0 && pipes[0].x + pipeWidth < 0) {
    pipes.shift();
  }
}

function gameOver() {
  gameRunning = false;
  startBtn.style.display = "block";
}

function gameLoop() {
  if (gameRunning) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBird();
    drawPipes();
    updateBird();
    updatePipes();
    requestAnimationFrame(gameLoop);
  }
}
