import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import {
  gallerySelector,
  addCardForm,
  userProfileForm,
  nameInput,
  descriptionInput,
  editProfileButton,
  addCardButton,
  validationConfig,
} from '../utils/constants.js';
import { errorHandler } from '../utils/helpers.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: '4e0acfe9-d71b-4358-91af-c8fd963442f5',
    'Content-Type': 'application/json',
  },
});

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

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__avatar',
});
api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data);
  })
  .catch(errorHandler);

const previewPopup = new PopupWithImage('.popup_type_preview');
const confirmPopup = new PopupWithSubmit('.popup_type_confirm');

const createCard = (data) => {
  const card = new Card(
    {
      data: {
        currentUserId: userInfo._id,
        ...data,
      },
      handleCardClick: () => {
        previewPopup.open(card);
      },
      handleLikeClick: (cardObject) => {
        const method = cardObject.isLiked()
          ? api.removeLike(cardObject.getId())
          : api.likeCard(cardObject.getId());
        method
          .then((data) => {
            cardObject.updateLikes(data);
          })
          .catch(errorHandler);
      },
      handleDeleteClick: (cardObject) => {
        confirmPopup.open();
        confirmPopup.setAction(() => {
          api
            .deleteCard(cardObject.getId())
            .then((_) => {
              confirmPopup.close();
              // TODO удалить из DOM
            })
            .catch(errorHandler);
        });
      },
    },
    '#gallery-item-template'
  );
  return card.generateCard();
};

const defaultCardList = new Section(
  {
    data: [],
    renderer: (item) => {
      const cardElement = createCard(item);
      defaultCardList.addItem(cardElement, false);
    },
  },
  gallerySelector
);
api
  .getInitialCards()
  .then((data) => {
    data.forEach((card) => {
      const cardElement = createCard(card);
      defaultCardList.addItem(cardElement);
    });
  })
  .catch(errorHandler);

const cardPopup = new PopupWithForm('.popup_type_add-card', (inputValues) => {
  api
    .addCard(inputValues)
    .then((data) => {
      const cardElement = createCard(data);
      defaultCardList.addItem(cardElement);
      cardPopup.close();
    })
    .catch(errorHandler);
});
const profilePopup = new PopupWithForm('.popup_type_edit-profile', (inputValues) => {
  api
    .updateUserInfo(inputValues)
    .then((data) => {
      userInfo.setUserInfo(data);
      profilePopup.close();
    })
    .catch(errorHandler);
});
[previewPopup, cardPopup, profilePopup, confirmPopup].forEach((popup) => popup.setEventListeners());

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
