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
} from './constants.js';

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  descriptionSelector: '.profile__description',
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

const cardPopup = new PopupWithForm('.popup_type_add-card', (event) => {
  event.preventDefault();
  const cardElement = createCard(cardPopup._getInputValues());
  defaultCardList.addItem(cardElement);
  cardPopup.close();
});
const profilePopup = new PopupWithForm('.popup_type_edit-profile', (event) => {
  event.preventDefault();
  userInfo.setUserInfo(profilePopup._getInputValues());
  profilePopup.close();
});

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
