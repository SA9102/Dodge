import { drawRect } from './utils.js';

const healthBar = {
  x: 10,
  y: 10,
  width: 200,
  height: 15,
};

export function drawHUD(ctx, player) {
  drawHealthBar(ctx, player);
}

function drawHealthBar(ctx, player) {
  ctx.fillStyle = 'green';
  drawRect(ctx, healthBar.x, healthBar.y, player.health, healthBar.height);
}
