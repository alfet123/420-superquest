import {createElement, changeView} from './util';
import renderFooter from './game/footer';
import renderHeader from './game/header';
import renderLevel from './game/game-level';
import {initialGame, setCurrentLevel, setTime, hasLevel, getLevel} from './data/quest';
import end from './end';


let game = initialGame;
let interval = null;


const update = () => {
  changeView(createElement(`
          ${renderHeader(game)}
          ${renderLevel(getLevel(game.level))}
          ${renderFooter()}`));
};


document.onkeydown = (evt) => {
  if (evt.keyCode === 13) {
    if (hasLevel(game.level + 1)) {
      game = setCurrentLevel(game, game.level + 1);
      update();
    } else {
      game = initialGame;
      clearInterval(interval);
      changeView(end);
    }
  }
};


export default () => {
  update();

  interval = setInterval(() => {
    game = setTime(game, game.time + 1);
    update();
  }, 1000);
};
