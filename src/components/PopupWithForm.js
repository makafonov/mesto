import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit;
    this._form = this._element.querySelector('.popup__form');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    /* eslint unicorn/prefer-object-from-entries: "off" */
    return this._inputs.reduce((result, { name, value }) => {
      return {
        ...result,
        [name]: value,
      };
    }, {});
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
