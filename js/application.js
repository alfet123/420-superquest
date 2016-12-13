import createWelcome from './screen/welcome-screen';
import newGame from './screen/game-screen';
import showStats from './screen/stats-screen';
import showError from './screen/error-screen';
import 'whatwg-fetch';

const main = document.getElementById('main');
const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};

let questData;

export default class Application {

  static showWelcome() {
    changeView(createWelcome());
  }

  static showGame() {
    changeView(newGame(questData));
  }

  static showStats(stats) {
    changeView(showStats(stats))
  }

  static showError(error) {
    changeView(showError(error));
  }

  static set data(data) {
    questData = data;
  }
}
