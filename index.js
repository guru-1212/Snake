const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const grid = 20;
let count = 0;
let snake = [{ x: 160, y: 160 }, { x: 140, y: 160 }, { x: 120, y: 160 }, { x: 100, y: 160 }];
let direction = 'right';
let food = { x: 320, y: 320 };
let gameOver = false;

function getRandomFoodPosition() {
  let x = Math.floor((Math.random() * canvas.width) / grid) * grid;
  let y = Math.floor((Math.random() * canvas.height) / grid) * grid;
  return { x, y };
}

function drawSnakePart(snakePart) {
  ctx.fillStyle = 'lightgreen';
  ctx.strokeStyle = 'darkgreen';
  ctx.fillRect(snakePart.x, snakePart.y, grid - 1, grid - 1);
  ctx.strokeRect(snakePart.x, snakePart.y, grid - 1, grid - 1);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  const left = 37;
  const up = 38;
  const right = 39;
  const down = 40;

  if (keyPressed === left && direction !== 'right') {
    direction = 'left';
  }

  if (keyPressed === up && direction !== 'down') {
    direction = 'up';
  }

  if (keyPressed === right && direction !== 'left') {
    direction = 'right';
  }

  if (keyPressed === down && direction !== 'up') {
    direction = 'down';
  }
}

function moveSnake() {
  const head = { x: snake[0].x, y: snake[0].y };

  if (direction === 'left') {
    head.x -= grid;
  }

  if (direction === 'up') {
    head.y -= grid;
  }

  if (direction === 'right') {
    head.x += grid;
  }

  if (direction === 'down') {
    head.y += grid;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = getRandomFoodPosition();
  } else {
    snake.pop();
  }
}

function checkCollision() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x >= canvas.width;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y >= canvas.height;

  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, grid - 1, grid - 1);
}

function main() {
  if (gameOver) {
    document.getElementById('game-over').style.display = 'block';
    return;
  }

  requestAnimationFrame(main);

  if (++count < 4) {
    return;
  }

  count = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawFood();
  moveSnake();
  drawSnake();

  gameOver = checkCollision();
}

function restartGame() {
  snake = [{ x: 160, y: 160 }, { x: 140, y: 160 }, { x: 120, y: 160 }, { x: 100, y: 160 }];
  direction = 'right';
  food = getRandomFoodPosition();
  gameOver = false;
  document.getElementById('game-over').style.display = 'none';
  main();
}

document.addEventListener('keydown', changeDirection);

main();