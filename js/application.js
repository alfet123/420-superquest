import welcome from './screen/welcome-screen';
import newGame from './screen/game-screen';
import showStats from './screen/stats-screen';

const main = document.getElementById('main');
const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};


export default class Application {

  static showWelcome() {
    changeView(welcome());
  }

  static showGame() {
    changeView(newGame());
  }

  static showStats(stats) {
    changeView(showStats(stats))
  }

}
