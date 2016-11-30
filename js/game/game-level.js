import {createElement} from '../util';

const gameElement = createElement(``);
export default (level, onAnswer) => {

  gameElement.innerHTML = `
<div class="quest">
  <p class="text">${level.text}</p>
  <input type="text">
  <ul class="answers">
    ${level.answers.map((it, i) => `<li class="answer">${it.action}</li>`).join('')}
  </ul>  
</div>`;

  const answers = gameElement.querySelector(`ul.answers`).querySelectorAll(`li`);

  for (let i = 0; i < answers.length; i++) {
    const answer = answers[i];
    answer.onclick = (evt) => {
      evt.preventDefault();

      onAnswer(level.answers[i]);
    };
  }

  const answerInput = gameElement.querySelector(`input`);

  answerInput.onkeydown = (evt) => {
    if (evt.keyCode === 13) {

      const text = answerInput.value;
      const answer = level.answers.find((it) => it.action.toLowerCase().startsWith(text));
      if (answer) {
        onAnswer(answer);
      } else {
        onAnswer(text);
      }
      answerInput.value = ``;
    }
  };

  answerInput.focus();

  return gameElement;
};
