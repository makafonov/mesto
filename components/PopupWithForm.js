import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit;
  }

  _getInputValues() {
    // TODO собирает данные всех полей формы
  }

  _setEventListeners() {
    super._setEventListeners();
    this._element.addEventListener('submit', this._submit);
  }

  close() {
    super.close();
    this._element.querySelector('.popup__form').reset();
  }
}
