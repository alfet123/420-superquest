import {createElement} from './util';
import renderHeader from './game/header';
import renderLevel from './game/game-level';
import {quest, game} from './data/quest';

const footer = `<div class="result"></div>
<small>Для справки введите <i>help</i></small></ul>`;

let current = -1;
const element = createElement('');

const changeLevel = (num) => {
  current = num;
  const level = quest[`level-${num}`];

  element.innerHTML = `${renderHeader(game)}
          ${renderLevel(level)}
          ${footer}`;
};

//Load first level on start!
changeLevel(0);

document.onkeydown = (evt) => {
  if (evt.keyCode === 13) {
    changeLevel(current + 1);
  }
};

export default element;
