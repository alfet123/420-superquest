import AbstractView from './view';

export default class FooterView extends AbstractView {
  getMarkup() {
    return `
    <div class="result"></div>
    <small>Для справки введите <i>help</i></small>`;
  }
}
