import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import {
  gallerySelector,
  initialCards,
  addCardForm,
  userProfileForm,
  nameInput,
  descriptionInput,
  editProfileButton,
  addCardButton,
  validationConfig,
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: '4e0acfe9-d71b-4358-91af-c8fd963442f5',
    'Content-Type': 'application/json',
  },
});

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__avatar',
});
api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo({
      name: data.name,
      description: data.about,
      avatar: data.avatar,
    });
  })
  .catch((error) => {
    console.log(error);
  });

const previewPopup = new PopupWithImage('.popup_type_preview');

const handleCardClick = (card) => {
  previewPopup.open(card);
};

const createCard = (data) => {
  const card = new Card(data, '#gallery-item-template', handleCardClick);
  return card.generateCard();
};

const defaultCardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      defaultCardList.addItem(cardElement, false);
    },
  },
  gallerySelector
);
defaultCardList.renderItems();

const formValidators = {};
const enableValidation = ({ formSelector, ...params }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((form) => {
    const validator = new FormValidator(params, form);
    validator.enableValidation();
    formValidators[form.getAttribute('name')] = validator;
  });
};
enableValidation(validationConfig);

const cardPopup = new PopupWithForm('.popup_type_add-card', (inputValues) => {
  const cardElement = createCard(inputValues);
  defaultCardList.addItem(cardElement);
  cardPopup.close();
});
const profilePopup = new PopupWithForm('.popup_type_edit-profile', (inputValues) => {
  userInfo.setUserInfo(inputValues);
  profilePopup.close();
});
[previewPopup, cardPopup, profilePopup].forEach((popup) => popup.setEventListeners());

addCardButton.addEventListener('click', () => {
  formValidators[addCardForm.getAttribute('name')].resetValidation();
  cardPopup.open();
});
editProfileButton.addEventListener('click', () => {
  const { name, description } = userInfo.getUserInfo();
  nameInput.value = name;
  descriptionInput.value = description;
  formValidators[userProfileForm.getAttribute('name')].resetValidation();
  profilePopup.open();
});
