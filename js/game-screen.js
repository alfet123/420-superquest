import {changeView, createElement} from './util';
import {Result} from './data/quest-data';

import showStats from './stats-screen';
import QuestModel from './data/quest-model';
import HeaderView from './game/header-view';
import LevelView from './game/level-view';
import GameOverView from './game/gameover-view';

const questModel = new QuestModel();
const root = createElement(``);

const game = {
  header: new HeaderView(questModel.state),
  content: new LevelView(questModel.getCurrentLevel()),
  interval: null,

  stopGame()  {
    clearInterval(game.interval);
  },

  startGame() {
    game.changeLevel();

    game.interval = setInterval(() => {
      questModel.tick();
      game.updateHeader();
    }, 1000);
  },

  onAnswer(answer) {
    game.stopGame();
    switch (answer.result) {
      case Result.NEXT:
        questModel.nextLevel();
        game.startGame();
        break;
      case Result.DIE:
        questModel.die();
        game.endGame(false, !(questModel.isDead()));
        break;
      case Result.WIN:
        game.endGame(true, false);
        break;
      default:
        throw new Error(`Unknown result: ${answer.result}`);
    }
  },

  onRestart(continueGame) {
    if (!continueGame) {
      questModel.restart();
    }
    game.startGame();
  },

  onExit() {
    showStats(questModel.state);
  },

  updateHeader() {
    const header = new HeaderView(questModel.state);
    root.replaceChild(header.element, game.header.element);
    game.header = header;
  },

  changeLevel() {
    game.updateHeader();

    const level = new LevelView(questModel.getCurrentLevel());
    level.onAnswer = game.onAnswer;
    game.changeContentView(level);
    level.focus();
  },


  endGame(win, canContinue) {
    const gameOver = new GameOverView(win, canContinue);
    gameOver.onRestart = game.onRestart;
    gameOver.onExit = game.onExit;

    game.changeContentView(gameOver);
    game.updateHeader();
  },

  changeContentView(view) {
    root.replaceChild(view.element, game.content.element);
    game.content = view;
  }

};

root.appendChild(game.header.element);
root.appendChild(game.content.element);

export default () => {
  questModel.restart();
  game.startGame();
  changeView(root);
};
