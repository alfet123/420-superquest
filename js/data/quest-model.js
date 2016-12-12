import {initialGame, hasLevel, setCurrentLevel, setLives, getLevel, setTime} from './quest';


export default class QuestModel {
  constructor(data, state = initialGame) {
    this.data = data;
    this._state = state;
  }

  get state() {
    return this._state;
  }

  hasLevel(num) {
    return typeof this.getLevel(num) !== 'undefined';
  }

  getLevel(num) {
    return this.data[`level-${num}`];
  }

  hasNextLevel() {
    return this.hasLevel(this._state.level + 1);
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
    if (!this.hasLevel(this._state.level)) {
      throw new RangeError(`This game has no level ${num}`);
    }

    return this.getLevel(this._state.level);
  }

  tick() {
    this._state = setTime(this._state, this._state.time + 1);
  }
}
