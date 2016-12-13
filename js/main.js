import Application from './application';
import 'whatwg-fetch';


const status = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};


window.fetch('https://intensive-ecmascript-server-wjkfyoijxa.now.sh/text-quest/quest').
    then(status).
    then((response) => response.json()).
    then((data) => {
      Application.data = data;
    }).
    then(Application.showWelcome).
    catch(Application.showError);
