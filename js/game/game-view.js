import {createElement} from '../util';
import HeaderView from './header-view';
import LevelView from './level-view';
import GameOverView from './gameover-view';

export default class GameView {
  constructor() {
    this._root = null;

    this._header = null;
    this._level = null;
  }

  set onAnswer(handler) {
    this._onAnswer = handler;
  }

  set onRestart(handler) {
    this._onRestart = handler;
  }

  set onExit(handler) {
    this._onExit = handler;
  }

  set header(data) {
    const header = new HeaderView(data);
    if (this._header) {
      this._root.replaceChild(header.element, this._header.element);
    }
    this._header = header;
  }

  set level(data) {
    const level = new LevelView(data);
    level.onAnswer = this._onAnswer;
    this._changeLevel(level);
    level.focus();
  }


  gameOver(win, canContinue) {
    const gameOver = new GameOverView(win, canContinue);
    gameOver.onRestart = this._onRestart;
    gameOver.onExit = this._onExit;

    this._changeLevel(gameOver);
  }

  _changeLevel(level) {
    if (this._level) {
      this._root.replaceChild(level.element, this._level.element);
    }
    this._level = level;
  }

  get element() {
    if (!this._root) {
      this._root = createElement(``);
      this._root.appendChild(this._header.element);
      this._root.appendChild(this._level.element);
    }
    return this._root;
  }

}
