import {changeView} from './util';
import {Result} from './data/quest-data';

import GameView from './game/game-view';

import showStats from './stats-screen';
import QuestModel from './data/quest-model';

const questModel = new QuestModel();

const gameView = new GameView(questModel);
gameView.onAnswer = (answer) => {
  endGame();
  switch (answer.result) {
    case Result.NEXT:
      questModel.nextLevel();
      beginGame();
      break;
    case Result.DIE:
      questModel.die();
      gameView.endGame(false, !(questModel.isDead()));
      break;
    case Result.WIN:
      gameView.endGame(true, false);
      break;
    default:
      throw new Error(`Unknown result: ${answer.result}`);
  }
};
gameView.onRestart = (continueGame) => {
  if (!continueGame) {
    questModel.restart();
  }
  beginGame();
};

gameView.onExit = () => {
  showStats(questModel.state);
};

let interval = null;

const endGame = () => {
  clearInterval(interval);
};

const beginGame = () => {
  gameView.update();

  interval = setInterval(() => {
    questModel.tick();
    gameView.updateHeader();
  }, 1000);
};

export default () => {
  questModel.restart();
  beginGame();
  changeView(gameView.element);
};
