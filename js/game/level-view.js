import AbstractView from './view';

export default class LevelView extends AbstractView {
  constructor(levelData) {
    super();
    this.level = levelData;
  }

  set onAnswer(handler) {
    this._onAnswer = handler;
  }

  focus() {
    this.element.querySelector(`input`).focus();
  }

  getMarkup() {
    return `
    <div class="quest">
      <p class="text">${this.level.text}</p>
      <input type="text">
      <ul class="answers">
        ${this.level.answers.map((it, i) => `<li class="answer">${it.action}</li>`).join('')}
      </ul>  
    </div>`;
  }

  bindHandlers() {
    const answers = this.element.querySelector(`ul.answers`).querySelectorAll(`li`);

    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];
      answer.onclick = (evt) => {
        evt.preventDefault();

        this._onAnswer(this.level.answers[i]);
      };
    }

    const answerInput = this.element.querySelector(`input`);

    answerInput.onkeydown = (evt) => {
      if (evt.keyCode === 13) {

        const text = answerInput.value;
        const answer = this.level.answers.find((it) => it.action.toLowerCase().startsWith(text));
        if (answer) {
          this._onAnswer(answer);
        } else {
          this._onAnswer(text);
        }
        answerInput.value = ``;
      }
    };

  }
}
