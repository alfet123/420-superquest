import {createElement, changeView} from './util';
import startGame from './game-screen';


const root = createElement(`
<div class="end">
  <p>Ghbdtn! Настало время приключений! Ты готов сразится с неприятностями и получить принцессу прямо сейчас?!<br>
  A?!<br>
  Точно?!<br>
  Уверен?!<br>
  Стопудов?!</p>
  <p>08 есть?</p>
  <div class="repeat"><span class="repeat-action">Да</span></div>
</div>`);


root.querySelector(`span.repeat-action`).onclick = (evt) => {
  evt.preventDefault();
  startGame();
};


export default () => changeView(root);
