// all characters (player and enemies) will be created from 'entity'.
// uses composition instead of inheritance

import { drawRect } from './utils.js';

// initializes the entity
export const createEntity = (
  type,
  x = 200,
  y = 200,
  size = 30,
  speedX = 1,
  speedY = 1,
  health,
  color
) => {
  return {
    // attributes
    type,
    x,
    y,
    size,
    speedX,
    speedY,
    health,
    maxHealth: health,
    color,

    // methods
    ...draw(),
  };
};

const draw = () => {
  return {
    draw: function (ctx) {
      drawRect(ctx, this.x, this.y, this.size, this.size, this.color);
    },
  };
};
