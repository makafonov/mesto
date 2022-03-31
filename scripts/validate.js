const hasInvalidInput = (inputList) => inputList.some((input) => !input.validity.valid);

const toggleButtonState = (inputList, button, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  }
};

const showInputError = (form, input, errorMessage, params) => {
  const { inputErrorClass, errorClass } = params;
  const errorElement = form.querySelector(`.${input.name}-input-error`);
  input.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (form, input, params) => {
  const { inputErrorClass, errorClass } = params;
  const errorElement = form.querySelector(`.${input.name}-input-error`);
  input.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (form, input, params) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, params);
  } else {
    hideInputError(form, input, params);
  }
};

const setEventListeners = (form, params) => {
  const { inputSelector, submitButtonSelector, inactiveButtonClass } = params;
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const button = form.querySelector(submitButtonSelector);
  toggleButtonState(inputList, button, inactiveButtonClass);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, params);
      toggleButtonState(inputList, button, inactiveButtonClass);
    });
  });
};

const enableValidation = ({ formSelector, ...params }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListeners(form, params);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});
