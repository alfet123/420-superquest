import HeaderView from '../game/header-view';
import LevelView from '../game/level-view';
import GameOverView from '../game/gameover-view';
import Application from '../application';
import QuestModel from '../data/quest-model';

const Result = {
  DIE: 'die',
  NOOP: 'noop',
  NEXT: 'next',
  WIN: 'win'
};

class GamePresenter {
  constructor(model) {
    this.model = model;
    this.header = new HeaderView(this.model.state);
    this.content = new LevelView(this.model.getCurrentLevel());
    this.content.onAnswer = this.answer.bind(this);

    this.root = document.createElement('div');
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);

    this._interval = null;
  }

  stopGame() {
    clearInterval(this._interval);
  }

  startGame() {
    this.changeLevel();

    this._interval = setInterval(() => {
      this.model.tick();
      this.updateHeader();
    }, 1000);
  }

  answer(answer) {
    this.stopGame();
    switch (answer.result) {
      case Result.NEXT:
        this.model.nextLevel();
        this.startGame();
        break;
      case Result.DIE:
        this.model.die();
        this.endGame(false, !(this.model.isDead()));
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
      this.model.restart();
    }
    this.startGame();
  }

  exit() {
    Application.showStats(this.model.state);
  }

  updateHeader() {
    const header = new HeaderView(this.model.state);
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
  }

  changeLevel() {
    this.updateHeader();

    const level = new LevelView(this.model.getCurrentLevel());
    level.onAnswer = this.answer.bind(this);
    this.changeContentView(level);
    level.focus();
  }


  endGame(win, canContinue) {
    const gameOver = new GameOverView(win, canContinue);
    gameOver.onRestart = this.restart.bind(this);
    gameOver.onExit = this.exit.bind(this);

    this.changeContentView(gameOver);
    this.updateHeader();
  }

  changeContentView(view) {
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
  }

}

export default (questData) => {
  const game = new GamePresenter(new QuestModel(questData));
  game.startGame();
  return game.root;
};
