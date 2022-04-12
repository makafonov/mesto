export default class FormValidator {
  constructor(params, form) {
    this._form = form;
    this._params = params;

    this._inputs = Array.from(form.querySelectorAll(params.inputSelector));
    this._submitButton = form.querySelector(params.submitButtonSelector);
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => !input.validity.valid);
  }

  _disableSubmitButton = () => {
    const { inactiveButtonClass } = this._params;

    this._submitButton.classList.add(inactiveButtonClass);
    this._submitButton.setAttribute('disabled', true);
  };

  _enableSubmitButton = () => {
    const { inactiveButtonClass } = this._params;

    this._submitButton.classList.remove(inactiveButtonClass);
    this._submitButton.removeAttribute('disabled');
  };

  _toggleSubmitButton() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _getErrorElement(input) {
    return this._form.querySelector(`.${input.name}-input-error`);
  }

  _showInputError(input) {
    const { inputErrorClass, errorClass } = this._params;
    const errorElement = this._getErrorElement(input);
    input.classList.add(inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(errorClass);
  }

  _hideInputError(input) {
    const { inputErrorClass, errorClass } = this._params;
    const errorElement = this._getErrorElement(input);
    input.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _setEventListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleSubmitButton();
      });
    });
  }

  resetValidation() {
    this._inputs.forEach((input) => this._hideInputError(input));
    this._toggleSubmitButton();
  }

  enableValidation() {
    this._form.addEventListener('submit', (event) => event.preventDefault());
    this._setEventListeners();
  }
}
