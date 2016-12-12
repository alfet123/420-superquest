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

const status = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const json = (response) => response.json();

const questModelPromise = window.fetch('https://intensive-ecmascript-server-wjkfyoijxa.now.sh/text-quest/quest').
  then(status).
  then(json).
  then((data) => questData = data);


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

  static set onLoad(handler) {
    questModelPromise.then(handler);
  }

  static set onError(handler) {
    questModelPromise.catch(handler);
  }

}
