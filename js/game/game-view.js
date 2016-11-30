import {createElement} from '../util';
import FooterView from './footer-view';

export default class GameView {
  constructor() {
    this._root = createElement(``);

    this._header = createElement(``);
    this._level = createElement(``);
    this._footer = (new FooterView()).element;

    this._root.appendChild(this._header);
    this._root.appendChild(this._level);
    this._root.appendChild(this._footer);
  }

  set header(view) {
    const element = view.element;
    this._root.replaceChild(element, this._header);
    this._header = element;
  }

  set level(view) {
    const element = view.element;
    this._root.replaceChild(element, this._level);
    this._level = element;
  }

  get element() {
    return this._root;
  }

}
