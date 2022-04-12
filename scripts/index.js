import initialCards from './cards.js';
import Card from './Card.js';
import { disableSubmitButton, enableSubmitButton, FormValidator } from './FormValidator.js';

const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');

const popupPreview = document.querySelector('.popup_type_preview');
const previewImage = popupPreview.querySelector('.preview__image');
const previewTitle = popupPreview.querySelector('.preview__title');

const userProfileForm = document.forms.userProfile;
const nameInput = userProfileForm.querySelector('.popup__input_property_name');
const descriptionInput = userProfileForm.querySelector('.popup__input_property_description');
const submitProfileButton = userProfileForm.querySelector('.button');

const addCardForm = document.forms.addCard;
const cardNameInput = addCardForm.querySelector('.popup__input_property_name');
const cardLinkInput = addCardForm.querySelector('.popup__input_property_link');
const submitCardButton = addCardForm.querySelector('.button');

const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__description');
const galleryContainer = document.querySelector('.gallery');

const editProfileButton = document.querySelector('.button_type_edit');
const addCardButton = document.querySelector('.button_type_add');

const getActivePopup = () => document.querySelector('.popup_opened');

const handleEsc = (event) => {
  if (event.key === 'Escape') {
    closePopup(getActivePopup());
  }
};

const handleClickOutside = (event) => {
  if (event.target === event.currentTarget) {
    closePopup(getActivePopup());
  }
};

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', handleClickOutside);
  document.addEventListener('keyup', handleEsc);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keyup', handleEsc);
};

const resetFormsErrors = () => {
  const inputs = document.querySelectorAll('.popup__input');
  const errors = document.querySelectorAll('.popup__error');

  inputs.forEach((input) => input.classList.remove('popup__input_type_error'));
  errors.forEach((error) => {
    error.classList.remove('popup__error_visible');
    error.textContent = '';
  });
};

const renderPreview = (card) => {
  const name = card.getName();
  previewTitle.textContent = name;
  previewImage.alt = name;
  previewImage.src = card.getLink();
  openPopup(popupPreview);
};

const renderCard = (data, first = true) => {
  const cardData = data;
  cardData.preview = renderPreview;
  const card = new Card(cardData, '#gallery-item-template');
  const cardElement = card.generateCard();

  if (first) {
    galleryContainer.prepend(cardElement);
  } else {
    galleryContainer.append(cardElement);
  }
};

const editProfile = () => {
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;

  resetFormsErrors();
  enableSubmitButton(submitProfileButton, 'button_disabled');
  openPopup(popupEditProfile);
};

const submitProfileForm = (event) => {
  event.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  closePopup(popupEditProfile);
};

const addCard = () => {
  addCardForm.reset();
  resetFormsErrors();
  disableSubmitButton(submitCardButton, 'button_disabled');
  openPopup(popupAddCard);
};

const submitCardForm = (event) => {
  event.preventDefault();
  renderCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  });
  closePopup(popupAddCard);
};

initialCards.forEach((card) => renderCard(card, false));

popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target.classList.contains('button_type_close')) {
      closePopup(popup);
    }
  });
});

addCardButton.addEventListener('click', addCard);
editProfileButton.addEventListener('click', editProfile);

userProfileForm.addEventListener('submit', submitProfileForm);
addCardForm.addEventListener('submit', submitCardForm);

const enableValidation = ({ formSelector, ...params }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((form) => {
    const validator = new FormValidator(params, form);
    validator.enableValidation();
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
