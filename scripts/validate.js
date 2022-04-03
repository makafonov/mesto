const hasInvalidInput = (inputList) => inputList.some((input) => !input.validity.valid);

const disableSubmitButton = (button, inactiveButtonClass) => {
  button.classList.add(inactiveButtonClass);
  button.setAttribute('disabled', true);
};

const enableSubmitButton = (button, inactiveButtonClass) => {
  button.classList.remove(inactiveButtonClass);
  button.removeAttribute('disabled');
};

const toggleButtonState = (inputList, button, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(button, inactiveButtonClass);
  } else {
    enableSubmitButton(button, inactiveButtonClass);
  }
};

const getErrorElement = (form, input) => form.querySelector(`.${input.name}-input-error`);

const showInputError = (form, input, params) => {
  const { inputErrorClass, errorClass } = params;
  const errorElement = getErrorElement(form, input);
  input.classList.add(inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (form, input, params) => {
  const { inputErrorClass, errorClass } = params;
  const errorElement = getErrorElement(form, input);
  input.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (form, input, params) => {
  if (!input.validity.valid) {
    showInputError(form, input, params);
  } else {
    hideInputError(form, input, params);
  }
};

const setEventListeners = (form, params) => {
  const { inputSelector, submitButtonSelector, inactiveButtonClass } = params;
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const button = form.querySelector(submitButtonSelector);
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
    form.addEventListener('submit', (event) => event.preventDefault());
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
