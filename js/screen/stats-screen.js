import AbstractView from '../view';
import Application from '../application';

class StatsView extends AbstractView {

  constructor(stats) {
    super();
    this.stats = stats;
  }

  set onRestart(callback) {
    this._onRestart = callback;
  }

  getMarkup() {
    return `
      <div class="end">
        <p>Ну что ж?! Вот и закончились твои приключения =(<br>
        А вот немного статистики о тебе: <br>
        Прошел за: ${this.stats.time}<br>
        Осталось жизней: ${this.stats.lives}<br>
        Дошел до уровня: ${this.stats.level}<br>
        <p>Начнем по новой?</p>
        <div class="repeat"><span class="repeat-action">Да</span></div>
      </div>`;
  }


  bindHandlers() {
    this.element.querySelector(`span.repeat-action`).onclick = (evt) => {
      evt.preventDefault();

      Application.showGame();
    };

    return super.bindHandlers();
  }
}

export default (stats) => new StatsView(stats).element;
