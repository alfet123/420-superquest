import {createElement, changeView} from './util';
import renderHeader from './game/header';
import renderLevel from './game/game-level';
import {quest, game} from './data/quest';
import end from './end';

const footer = `<div class="result"></div>
<small>Для справки введите <i>help</i></small></ul>`;

let current = -1;
const element = createElement('');

const getLevel = (num) => quest[`level-${num}`];
const changeLevel = (num) => {
  current = num;
  const level = getLevel(num);

  element.innerHTML = `${renderHeader(game)}
          ${renderLevel(level)}
          ${footer}`;
};

// Load first level on start!
changeLevel(0);

document.onkeydown = (evt) => {
  if (evt.keyCode === 13) {
    const next = current + 1;
    if (getLevel(next)) {
      changeLevel(next);
    } else {
      changeLevel(0);
      changeView(end);
    }
  }
};

export default element;
