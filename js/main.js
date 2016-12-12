import Application from './application';

Application.onError = (error) => Application.showError(error);
Application.onLoad = () => Application.showWelcome();
