export const gallerySelector = '.gallery';

export const addCardForm = document.forms.addCard;
export const userProfileForm = document.forms.userProfile;
export const avatarForm = document.forms.loadAvatar;
export const nameInput = userProfileForm.querySelector('.popup__input_property_name');
export const descriptionInput = userProfileForm.querySelector('.popup__input_property_description');

export const editProfileButton = document.querySelector('.button_type_edit');
export const addCardButton = document.querySelector('.button_type_add');
export const avatarButton = document.querySelector('.profile__avatar');

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
