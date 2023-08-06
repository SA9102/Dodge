import { createEntity } from './entity.js';
import { move, bounce, generateRandomInt, collide } from './utils.js';

const createBouncingEnemy = () => {
  const obj = createEntity(
    'bouncingEnemy', // type
    generateRandomInt(50, 750), // x
    generateRandomInt(50, 550), // y
    15, // size
    generateRandomInt(-5, 5), // speedX
    generateRandomInt(-5, 5), // speedY
    100,
    'red'
  );
  return {
    ...obj,
    ...move(),
    ...bounce(),
    ...collide(),
  };
};

export default createBouncingEnemy;
