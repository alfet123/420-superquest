import {Command, Verdict} from './game-const';
import {GameScreen, ActionResult} from './game';

// TODO: Экран со статистикой
// TODO: Сущность пользователя
// TODO: Игрок
// TODO: Обратный отсчет времени
export default class GameEngine {
  static get commonCommands() {
    return new Set([
      Command.HELP,
      Command.STAT,
      Command.RESTART,
      Command.INFO
    ]);
  }

  static isAllowedCommand(screen, command) {
    return screen.commands.has(command) || GameEngine.commonCommands.has(command);
  }

  constructor(startScreen) {
    this._startScreen = startScreen;
    this.appContainer = document.querySelector('.container');
    this.inputField = document.querySelector('input');
    this.resultContainer = document.querySelector('.result');
  }

  get commonCommandAction() {
    return new Map([
      [Command.HELP, new ActionResult({
        message: `Доступные команды:
        ${Array.from(this.currentView.commands.keys()).
            concat(Array.from(GameEngine.commonCommands.values())).
            join('\n')}`
      })],

      [Command.STAT, new ActionResult({
        message: `Время? Идет! Вы пока живы`
      })],

      [Command.RESTART, new ActionResult({
        message: `Ну, давайте сначала, коль не шутите`,
        verdict: Verdict.GOTO,
        destination: this._startScreen
      })],

      [Command.UNKNOWN, new ActionResult({
        message: `Ничего не произошло`
      })],

      [Command.INFO, new ActionResult({
        message: `(c) HTML Academy 1986

Игра не закончена, сюда еще не добавлен обратный отсчет времени и работа с жизнями. Оставайтесь на связи, скоро все это будет.`
      })]
    ]);
  }

  get viewMap() {
    return new Map([
      [Verdict.DIE, (actionResult) => new GameScreen(`Вы умерли. Жаль`)],
      [Verdict.GOTO, (actionResult) => actionResult.destination],
      [Verdict.NOOP, (actionResult) => this.currentView],
      [Verdict.WIN, (actionResult) => new GameScreen(`Вы молодец`)]
    ]);
  }


  /** @param {string} command */
  handleView(command) {
    command = (GameEngine.isAllowedCommand(this.currentView, command) ?
      command : Command.UNKNOWN).toLowerCase();

    const result = this.currentView.commands.has(command) ?
      this.currentView.commands.get(command) :
      this.commonCommandAction.get(command);

    const switchView = () => {
      const dest = this.viewMap.get(result.verdict)(result);
      this.renderView(dest);
    };

    if (result.message) {
      this.resultContainer.innerHTML = result.message.concat(`

<small>Для продолжения нажмите <i>Enter</i></small>`).replace(/\n/g, '<br>');
      this.inputField.disabled = true;
      this.inputField.blur();

      document.onkeydown = (evt) => {
        if (evt.keyCode === 13) {
          switchView();
          document.onkeydown = null;
        }
      };
    } else {
      switchView();
    }
  }

  start() {
    this.renderView(this._startScreen);
  }

  /** @param {GameScreen} screen */
  renderView(screen) {
    this.currentView = screen;

    this.resultContainer.innerHTML = '';
    this.appContainer.innerHTML = `${screen.disposition.replace(/\n/g, '<br>')}<br><br><small>Для справки введите <i>help</i></small>`;
    this.inputField.value = '';
    this.inputField.disabled = false;
    this.inputField.onkeydown = (evt) => {
      if (evt.keyCode === 13) {
        evt.stopPropagation();
        this.handleView(evt.target.value);
      }
    };
    this.inputField.focus();
  }
}
