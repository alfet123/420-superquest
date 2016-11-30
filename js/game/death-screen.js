import init from '../game';
import {initialGame, setLives} from '../data/quest';
import {changeView, createElement} from '../util';

let gameState = initialGame;

const root = createElement(`
<div class="end">
  <p>Вы умерли!</p>
  <p>Повторим?!</p>
  <div class="repeat"><span class="repeat-action">Да</span>|<span class="repeat-action">Не</span></div>
</div>`);


root.querySelector(`span.repeat-action`).onclick = (evt) => {
  evt.preventDefault();

  init(setLives(gameState, gameState.lives - 1));
};

export default (state = initialGame) => {
  gameState = state;

  changeView(root);
};
