import AbstractView from './view';

export default class DeathView extends AbstractView {
  getMarkup() {
    return `
    <div class="end">
      <p>Вы умерли!</p>
      <p>Повторим?!</p>
      <div class="repeat"><span class="repeat-action">Да</span>|<span class="repeat-action">Не</span></div>
    </div>`;
  }

  bindHandlers() {
    this.element.querySelector(`span.repeat-action`).onclick = (evt) => {
      evt.preventDefault();

      this._onRestart();
    };
  }

  set onRestart(handler) {
    this._onRestart = handler;
  }
}
