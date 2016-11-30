import {changeView} from './util';
import {initialGame, setCurrentLevel, setTime, getLevel, setLives} from './data/quest';
import {Result} from './data/quest-data';

import GameView from './game/game-view';

import showStats from './stats-screen';

let gameState = initialGame;

const gameView = new GameView();
gameView.onAnswer = (answer) => {
  endGame();
  switch (answer.result) {
    case Result.NEXT:
      beginGame(setCurrentLevel(gameState, gameState.level + 1));
      break;
    case Result.DIE:
      gameView.gameOver(false, (gameState.lives - 1) > 0);
      break;
    case Result.WIN:
      gameView.gameOver(true, false);
      break;
    default:
      throw new Error(`Unknown result: ${answer.result}`);
  }
};
gameView.onRestart = (continueGame) => {
  gameState = continueGame ? setLives(gameState, gameState.lives - 1) : initialGame;
  beginGame(gameState);
};
gameView.onExit = () => {
  showStats(gameState);
};

let interval = null;

const endGame = () => {
  clearInterval(interval);
};

const beginGame = (state = initialGame) => {
  gameState = state;

  gameView.header = gameState;
  gameView.level = getLevel(gameState.level);

  interval = setInterval(() => {
    gameState = setTime(gameState, gameState.time + 1);
    gameView.header = gameState;
  }, 1000);
};

export default () => {
  beginGame();
  changeView(gameView.element);
};
