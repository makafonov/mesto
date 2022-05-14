import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit;
    this._form = this._element.querySelector('.popup__form');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submitButton = this._element.querySelector('.button_type_save');
    this._submitButtonCaption = this._submitButton.textContent;
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

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._submitButtonCaption;
    }
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
