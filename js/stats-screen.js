import {createElement, changeView} from './util';
import startGame from './game-screen';

export default (stats) => {
  const root = createElement(`
                <div class="end">
                  <p>Ну что ж?! Вот и закончились твои приключения =(<br>
                  А вот немного статистики о тебе: <br>
                  Прошел за: ${stats.time}<br>
                  Осталось жизней: ${stats.lives}<br>
                  Дошел до уровня: ${stats.level}<br>
                  <p>Начнем по новой?</p>
                  <div class="repeat"><span class="repeat-action">Да</span></div>
                </div>`);


  root.querySelector(`span.repeat-action`).onclick = (evt) => {
    evt.preventDefault();
    startGame();
  };

  changeView(root);
};
