import {createElement} from './util';
import init from './game';


const element = createElement(`
<div class="end">
  <p>КОНЕЦ!</p>
  <p>Повторим?!</p>
  <div class="repeat"><span class="repeat-action">Да</span>|<span class="repeat-action">Не</a></div>
</div>`);


element.querySelector(`span.repeat-action`).onclick = (evt) => {
  evt.preventDefault();
  init();
};


export default element;
