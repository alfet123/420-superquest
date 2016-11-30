import {changeView} from './util';
import HeaderView from './game/header-view';
import LevelView from './game/level-view';
import {initialGame, setCurrentLevel, setTime, getLevel, setLives} from './data/quest';
import {Result} from './data/quest-data';

import GameOverView from './game/gameover-view';
import DeathView from './game/death-view';
import GameView from './game/game-view';

import showStats from './stats-screen';

const gameView = new GameView();
let gameState = initialGame;
let interval = null;

const updateHeader = (game) => {
  gameView.header = new HeaderView(game);
};

const continueGame = () => {
  gameState = setLives(gameState, gameState.lives - 1);
  startGame(gameState);
};

const answerHandler = (answer) => {
  if (typeof answer === 'string') {
    switch (answer) {
      case `help`:
        // TODO: print help
        break;
      default:
        throw new Error(`Unknown answer ${answer}`);
    }
  } else {
    switch (answer.result) {
      case Result.DIE:
        endGame();
        const death = new DeathView();
        death.onRestart = continueGame;
        gameView.level = death;
        break;
      case Result.NEXT:
        gameState = setCurrentLevel(gameState, gameState.level + 1);
        update();
        break;
      case Result.WIN:
        endGame();
        const gameOver = new GameOverView(true);
        gameOver.onRestart = () => startGame(initialGame);
        gameOver.onExit = () => showStats(gameState);
        gameView.level = gameOver;
        break;
      default:
        throw new Error(`Unknown result: ${answer.result}`);
    }
  }
};

const updateLevel = (level) => {
  const levelView = new LevelView(level);
  gameView.level = levelView;
  levelView.onAnswer = answerHandler;
};

const update = () => {
  updateHeader(gameState);
  updateLevel(getLevel(gameState.level));
  // Footer never changes, so never update
};

const endGame = () => {
  clearInterval(interval);
};

const startGame = (state = initialGame) => {
  gameState = state;

  update();

  interval = setInterval(() => {
    gameState = setTime(gameState, gameState.time + 1);
    updateHeader(gameState);
  }, 1000);

  changeView(gameView.element);
};

export default startGame;
