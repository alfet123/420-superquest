import AbstractView from '../view';
import Application from '../application';
import 'whatwg-fetch';

const status = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(response.statusText);
  }
};

const json = (response) => response.json();

const questDataPromise = window.fetch('http://localhost:8080/text-quest/quest').then(status).then(json);

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
    questDataPromise.then((data) => {
      this.element.querySelector(`span.repeat-action`).onclick = (evt) => {
        evt.preventDefault();

        Application.showGame(data);
      };
    }).catch((err) => {
      this.element.innerHTML = err.message;
    })
  }
}

export default () => new WelcomeView().element;
