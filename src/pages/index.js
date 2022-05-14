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
  avatarButton,
  avatarForm,
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
            .then(() => {
              cardObject.remove();
              confirmPopup.close();
            })
            .catch(errorHandler);
        });
      },
    },
    '#gallery-item-template'
  );
  return card.generateCard();
};

const cardListSection = new Section(gallerySelector, (item) => {
  const cardElement = createCard(item);
  cardListSection.addItem(cardElement, false);
});

api
  .getInitialData()
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardListSection.renderItems(cards);
  })
  .catch(errorHandler);

const cardPopup = new PopupWithForm('.popup_type_add-card', (inputValues) => {
  cardPopup.renderLoading(true);
  api
    .addCard(inputValues)
    .then((data) => {
      const cardElement = createCard(data);
      cardListSection.addItem(cardElement);
      cardPopup.close();
    })
    .catch(errorHandler)
    .finally(() => {
      cardPopup.renderLoading(false);
    });
});
const profilePopup = new PopupWithForm('.popup_type_edit-profile', (inputValues) => {
  profilePopup.renderLoading(true);
  api
    .updateUserInfo(inputValues)
    .then((data) => {
      userInfo.setUserInfo(data);
      profilePopup.close();
    })
    .catch(errorHandler)
    .finally(() => {
      profilePopup.renderLoading(false);
    });
});
const avatarPopup = new PopupWithForm('.popup_type_avatar', (inputValues) => {
  avatarPopup.renderLoading(true);
  api
    .updateAvatar(inputValues)
    .then((data) => {
      userInfo.setUserInfo(data);
      avatarPopup.close();
    })
    .catch(errorHandler)
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
});
[previewPopup, cardPopup, profilePopup, confirmPopup, avatarPopup].forEach((popup) =>
  popup.setEventListeners()
);

const editUserInfo = () => {
  const { name, description } = userInfo.getUserInfo();
  nameInput.value = name;
  descriptionInput.value = description;
  formValidators[userProfileForm.getAttribute('name')].resetValidation();
  profilePopup.open();
};

avatarButton.addEventListener('click', () => {
  formValidators[avatarForm.getAttribute('name')].resetValidation();
  avatarPopup.open();
});
addCardButton.addEventListener('click', () => {
  formValidators[addCardForm.getAttribute('name')].resetValidation();
  cardPopup.open();
});
editProfileButton.addEventListener('click', editUserInfo);
