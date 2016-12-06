import {createElement} from './util';
import {Result} from './data/quest-data';
import questModel from './data/quest-model';
import HeaderView from './game/header-view';
import LevelView from './game/level-view';
import GameOverView from './game/gameover-view';
import Application from './application';

class GamePresenter {
  constructor() {
    this.header = new HeaderView(questModel.state);
    this.content = new LevelView(questModel.getCurrentLevel());

    this.root = createElement(``);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);

    this._interval = null;
  }

  stopGame()  {
    clearInterval(this._interval);
  }

  startGame() {
    this.changeLevel();

    this._interval = setInterval(() => {
      questModel.tick();
      this.updateHeader();
    }, 1000);
  }

  answer(answer) {
    this.stopGame();
    switch (answer.result) {
      case Result.NEXT:
        questModel.nextLevel();
        this.startGame();
        break;
      case Result.DIE:
        questModel.die();
        this.endGame(false, !(questModel.isDead()));
        break;
      case Result.WIN:
        this.endGame(true, false);
        break;
      default:
        throw new Error(`Unknown result: ${answer.result}`);
    }
  }

  restart(continueGame) {
    if (!continueGame) {
      questModel.restart();
    }
    this.startGame();
  }

  exit() {
    Application.showStats(questModel.state);
  }

  updateHeader() {
    const header = new HeaderView(questModel.state);
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
  }

  changeLevel() {
    this.updateHeader();

    const level = new LevelView(questModel.getCurrentLevel());
    level.onAnswer = this.answer.bind(this);
    this.changeContentView(level);
    level.focus();
  }


  endGame(win, canContinue) {
    const gameOver = new GameOverView(win, canContinue);
    gameOver.onRestart = this.restart.bind(this);
    gameOver.onExit = this.exit.bind(this);

    game.changeContentView(gameOver);
    game.updateHeader();
  }

  changeContentView(view) {
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
  }

}

const game = new GamePresenter();

export default () => {
  game.restart(false);
  return game.root;
};
