import {createElement, changeView} from './util';
import renderFooter from './game/footer';
import renderHeader from './game/header';
import renderLevel from './game/game-level';
import {initialGame, setCurrentLevel, setTime, getLevel} from './data/quest';
import {Result} from './data/quest-data';

import end from './end';
import die from './game/death-screen';


let gameState = initialGame;
let interval = null;

const root = createElement(``);
const headerElement = renderHeader(gameState);
const levelElement = renderLevel(getLevel(gameState.level));
const footerElement = renderFooter();

root.appendChild(headerElement);
root.appendChild(levelElement);
root.appendChild(footerElement);

const updateHeader = (game) => {
  renderHeader(game);
};

const updateLevel = (level) => {
  renderLevel(level, (answer) => {
    if (typeof answer === 'string') {
      switch (answer) {
        case `help`:
          // TODO: print help
          break;
        default:
          throw new Error(`Unknown answer ${answer}`);
      }
    } else {
      switch (answer.result) {
        case Result.DIE:
          onExit();
          die(gameState);
          break;
        case Result.NEXT:
          gameState = setCurrentLevel(gameState, gameState.level + 1);
          update();
          break;
        case Result.WIN:
          onExit();
          end();
          break;
        default:
          throw new Error(`Unknown result: ${answer.result}`);
      }
    }
  });
};

const update = () => {
  updateHeader(gameState);
  updateLevel(getLevel(gameState.level));
  // Footer never changes, so never update
};

const onExit = () => {
  clearInterval(interval);
};

const onEnter = () => {
  update();

  interval = setInterval(() => {
    gameState = setTime(gameState, gameState.time + 1);
    updateHeader(gameState);
  }, 1000);

  changeView(root);
};

export default (state = initialGame) => {
  gameState = state;

  onEnter();
};
