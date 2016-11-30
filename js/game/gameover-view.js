import AbstractView from './view';

export default class GameOverView extends AbstractView {
  constructor(win) {
    super();
    this.win = win;
  }

  set onRestart(handler) {
    this._onRestart = handler;
  }

  set onExit(handler) {
    this._onExit = handler;
  }


  getMarkup() {
    return `
    <div class="end">
      <p>${this.win ? `Победа!` : `Проигрыш =(`}!</p>
      <p>Повторим?!</p>
      <div class="repeat"><span class="repeat-action">Да</span>|<span class="repeat-action">Не</a></div>
    </div>`;
  }

  bindHandlers() {
    const options = this.element.querySelectorAll(`span.repeat-action`);
    options[0].onclick = (evt) => {
      evt.preventDefault();

      this._onRestart();
    };

    options[1].onclick = (evt) => {
      evt.preventDefault();

      this._onExit();
    };
  }
}
