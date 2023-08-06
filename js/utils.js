// drawing a rectangle
export function drawRect(ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

// move entity (for enemies)
export const move = () => {
  return {
    move: function () {
      this.x += this.speedX;
      this.y += this.speedY;
    },
  };
};

// enemies change direction when the hit the edge of the game area
export const bounce = () => {
  return {
    bounce: function (canvas) {
      if (this.x <= 0 || this.x + this.size >= canvas.width) {
        this.speedX = -this.speedX;
      }

      if (this.y <= 0 || this.y + this.size >= canvas.height) {
        this.speedY = -this.speedY;
      }
    },
  };
};

export const generateRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// get the coordinates of the center of an entity
export const getCenterPos = (entity) => {
  return {
    centerX: entity.x + Math.floor(entity.size / 2),
    centerY: entity.y + Math.floor(entity.size / 2),
  };
};

// used by enemies to check if colliding with player
export const collide = () => {
  return {
    collide: function (player) {
      // get the coordinates of the center of the player and enemy
      const playerCenterPos = getCenterPos(player);
      const enemyCenterPos = getCenterPos(this);

      // distance between player and enemy along the x and y axes
      const distanceXY = {
        x: Math.abs(enemyCenterPos.centerX - playerCenterPos.centerX),
        y: Math.abs(enemyCenterPos.centerY - playerCenterPos.centerY),
      };

      // distance between player and enemy as a straight line
      const distance = Math.sqrt(distanceXY.x ** 2 + distanceXY.y ** 2);

      // get the angle
      let angle;
      if (distanceXY.x >= distanceXY.y) {
        angle = Math.atan2(distanceXY.y, distanceXY.x);
      } else {
        angle = Math.atan2(distanceXY.x, distanceXY.y);
      }

      const centerToEdgePlayer = player.size / 2 / Math.cos(angle);
      const centerToEdgeEnemy = this.size / 2 / Math.cos(angle);

      return distance <= centerToEdgePlayer + centerToEdgeEnemy;
    },
  };
};
