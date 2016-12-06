import {changeView} from './util';
import welcome from './welcome-screen';
import newGame from './game-screen';
import showStats from './stats-screen';

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
