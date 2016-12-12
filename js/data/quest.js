export const initialGame = {
  level: 0,
  lives: 3,
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
