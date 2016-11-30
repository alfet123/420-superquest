import AbstractView from './view';

const range = (from = 0, to) => {
  return (callback) => {
    const array = [];
    for (let i = from; i < to; i++) {
      array.push(callback(i));
    }
    return array;
  };
};

export default class HeaderView extends AbstractView {
  constructor(gameState) {
    super();
    this.state = gameState;
  }

  update(newState) {
    this.state = newState;
    this.element.innerHTML = this.getMarkup();
  }

  _drawHeart(index) {
    const full = index < this.state.lives;
    return `<span class="heart__${full ? `full` : `empty`}">${full ? `&#9829;` : `&#9825;`}</span>`;
  }

  getMarkup() {
    return `
    <header class="header">
      <div>Мир: ${this.state.level}</div>
      <div>Жизни: ${range(0, 3)((i) => this._drawHeart(i)).reverse().join('')}</div>
      <div>Время: ${this.state.time}</div>
    </header>`;
  }

  bindHandlers() {
    return super.bindHandlers();
  }
}
