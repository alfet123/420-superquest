import {questInfo} from './quest-data';
export const initialGame = {
  level: 0,
  lives: 2,
  time: 0
};

export const setCurrentLevel = (game, level) => {
  return Object.assign({}, game, {
    level: level
  });
};


export const setTime = (game, time) => {
  return Object.assign({}, game, {
    time: time
  });
};


export const setLives = (game, lives) => {
  if (lives < 0) {
    throw new RangeError(`Number of lives can't be negative`);
  }

  return Object.assign({}, game, {
    lives: lives
  });
};

export const hasLevel = (num) => typeof questInfo[`level-${num}`] !== 'undefined';

export const getLevel = (num) => {
  if (!hasLevel(num)) {
    throw new RangeError(`This game has no level ${num}`);
  }

  return questInfo[`level-${num}`];
};

