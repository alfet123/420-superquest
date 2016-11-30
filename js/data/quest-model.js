import {initialGame, hasLevel, setCurrentLevel, setLives, getLevel, setTime} from './quest';

export default class QuestModel {
  constructor(state = initialGame) {
    this._state = state;
  }

  get state() {
    return this._state;
  }

  hasNextLevel() {
    return hasLevel(this._state.level + 1);
  }

  nextLevel() {
    this._state = setCurrentLevel(this._state, this._state.level + 1);
  }

  die() {
    this._state = setLives(this._state, this._state.lives - 1);
  }

  restart() {
    this._state = initialGame;
  }

  isDead() {
    return this._state.lives <= 0;
  }

  getCurrentLevel() {
    return getLevel(this._state.level);
  }

  tick() {
    this._state = setTime(this._state, this._state.time + 1);
  }
}
