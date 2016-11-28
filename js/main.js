import GameEngine from './engine';
import welcome from './level-0/welcome';
import view from './game-view';

const main = document.getElementById('main');
main.appendChild(view);

new GameEngine(welcome).start();
