import Popup from './Popup.js';

export default class extends Popup {
  setAction(func) {
    this._action = func;
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener('submit', (event) => {
      event.preventDefault();
      this._action();
    });
  }
}
