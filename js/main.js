import createPlayer from './player.js';
import createBouncingEnemy from './bouncingEnemy.js';
import { drawHUD } from './HUD.js';
import { drawRect } from './utils.js'; // utility functions

const canvas = document.getElementById('canvasContainer');

canvas.width = 800;
canvas.height = 600;
const ctx = canvas.getContext('2d');

window.requestAnimationFrame(gameLoop);

// The user could be pressing multiple keys at once,
// so we store this in an array.
const keysPressed = [];

// If a key has been pressed, we add its code to the array.
// If the key continues to be held down, its code will keep
// on being pushed to the array, so the function checks first
// if the code is not already in the array.
const keyDown = (e) => {
  if (!keysPressed.includes(e.keyCode)) {
    keysPressed.push(e.keyCode);
  }
};

// For the key that has just been released, we remove its code
// from the array.
const keyUp = (e) => {
  const index = keysPressed.indexOf(e.keyCode);
  keysPressed.splice(index, 1);
};

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

// create entities
const player = createPlayer();
const bouncingEnemies = [
  createBouncingEnemy(),
  createBouncingEnemy(),
  createBouncingEnemy(),
];

// main game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the entire screen
  update(); // update variables in all entities
  draw(); // draw all entities with their updated variables
  window.requestAnimationFrame(gameLoop);
}

// updating variables
function update() {
  // player
  player.movement(keysPressed);
  player.clamp(canvas);

  // enemies
  for (const enemy of bouncingEnemies) {
    enemy.move();
    enemy.bounce(canvas);
    if (enemy.collide(player)) player.reduceHealth(1);
  }
}

// rendering assets onto the screen
function draw() {
  // background
  drawRect(ctx, 0, 0, canvas.width, canvas.height, 'black'); // fill entire canvas black

  // player
  player.draw(ctx);

  // enemies
  for (const enemy of bouncingEnemies) {
    enemy.draw(ctx);
  }

  // HUD
  drawHUD(ctx, player);
}
