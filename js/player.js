import { createEntity } from './entity.js';

// control movement with keyboard
const movement = () => {
  return {
    movement: function (keysPressed) {
      // D -> Right
      if (keysPressed.includes(68)) {
        this.x += this.speedX;
      }

      // A -> Left
      if (keysPressed.includes(65)) {
        this.x -= this.speedX;
      }

      // W -> Up
      if (keysPressed.includes(87)) {
        this.y -= this.speedY;
      }

      // S -> Down
      if (keysPressed.includes(83)) {
        this.y += this.speedY;
      }
    },
  };
};

// prevent player from going outside the boundary
const clamp = () => {
  return {
    clamp: function (canvas) {
      // right-most boundary
      if (this.x + this.size >= canvas.width) {
        this.x = canvas.width - this.size;
      }

      // left-most boundary
      if (this.x <= 0) {
        this.x = 0;
      }

      // top-most boundary
      if (this.y <= 0) {
        this.y = 0;
      }

      // bottom-most boundary
      if (this.y + this.size >= canvas.height) {
        this.y = canvas.height - this.size;
      }
    },
  };
};

// reduce player health
const reduceHealth = () => {
  return {
    reduceHealth: function (amount) {
      this.health -= amount;
    },
  };
};

const createPlayer = () => {
  const player = createEntity(
    'player',
    100,
    100,
    20,
    3,
    3,
    500,
    'lightseagreen'
  );
  return {
    ...player,
    ...movement(),
    ...clamp(),
    ...reduceHealth(),
  };
};

export default createPlayer;
