export default class {
  constructor(selector) {
    this._element = document.querySelector(selector);
  }

  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _handleClose = (event) => {
    if (
      event.target === event.currentTarget ||
      event.target.classList.contains('button_type_close')
    ) {
      this.close();
    }
  }

  _setEventListeners() {
    this._element.addEventListener('click', this._handleClose);
    document.addEventListener('keyup', this._handleEscClose);
  }

  _removeEventListeners() {
    this._element.removeEventListener('click', this._handleClose);
    document.removeEventListener('keyup', this._handleEscClose);
  }

  open() {
    this._element.classList.add('popup_opened');
    this._setEventListeners();
  }

  close() {
    this._element.classList.remove('popup_opened');
    this._removeEventListeners();
  }
}
