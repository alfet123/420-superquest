import createWelcome from './screen/welcome-screen';
import newGame from './screen/game-screen';
import showStats from './screen/stats-screen';

const main = document.getElementById('main');
const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};


export default class Application {

  static showWelcome() {
    changeView(createWelcome());
  }

  static showGame(questData) {
    changeView(newGame(questData));
  }

  static showStats(stats) {
    changeView(showStats(stats))
  }

}
