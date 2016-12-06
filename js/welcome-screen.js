import AbstractView from './game/view';
import Application from './application';

class WelcomeView extends AbstractView {

  getMarkup() {
    return `
      <div class="end">
        <p>Ghbdtn! Настало время приключений! Вы готовы сразится с неприятностями и получить принцессу прямо сейчас?!<br>
        A?!<br>
        Точно?!<br>
        Уверен?!<br>
        Стопудов?!</p>
        <p>08 есть?</p>
        <div class="repeat"><span class="repeat-action">Да</span></div>
      </div>`;
  }


  bindHandlers() {
    this.element.querySelector(`span.repeat-action`).onclick = (evt) => {
      evt.preventDefault();

      Application.showGame();
    };
  }
}

export default () => new WelcomeView().element;
