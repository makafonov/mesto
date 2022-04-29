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

  setEventListeners() {
    this._element.addEventListener('click', this._handleClose);
  }

  open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }
}
