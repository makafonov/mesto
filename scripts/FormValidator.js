const disableSubmitButton = (button, inactiveButtonClass) => {
  button.classList.add(inactiveButtonClass);
  button.setAttribute('disabled', true);
};

const enableSubmitButton = (button, inactiveButtonClass) => {
  button.classList.remove(inactiveButtonClass);
  button.removeAttribute('disabled');
};

class FormValidator {
  constructor(params, form) {
    this._form = form;
    this._params = params;
  }

  _hasInvalidInput(inputList) {
    return inputList.some((input) => !input.validity.valid);
  }

  _toggleButtonState(inputList, button) {
    if (this._hasInvalidInput(inputList)) {
      disableSubmitButton(button, this._params.inactiveButtonClass);
    } else {
      enableSubmitButton(button, this._params.inactiveButtonClass);
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
    const { inputSelector, submitButtonSelector } = this._params;
    const inputList = Array.from(this._form.querySelectorAll(inputSelector));
    const button = this._form.querySelector(submitButtonSelector);
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState(inputList, button);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (event) => event.preventDefault());
    this._setEventListeners();
  }
}

export { FormValidator, disableSubmitButton, enableSubmitButton };
