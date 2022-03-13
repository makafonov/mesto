const editButton = document.querySelector('.button_type_edit');
const addCardButton = document.querySelector('.button_type_add');
const closeButtons = document.querySelectorAll('.button_type_close');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');

const userProfileForm = document.forms.userProfile;
const nameInput = userProfileForm.querySelector('.popup__input_property_name');
const descriptionInput = userProfileForm.querySelector('.popup__input_property_description');

const addCardForm = document.forms.addCard;

const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__description');
const galleryContainer = document.querySelector('.gallery');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const toggleLike = (event) => event.target.classList.toggle('button_type_like-active');

const addCard = (name, link, first = true) => {
  const cardTemplate = document.querySelector('#gallery-item-template').content;
  const cardElement = cardTemplate.querySelector('.gallery__item').cloneNode(true);

  cardElement.querySelector('.gallery__title').textContent = name;
  cardElement.querySelector('.gallery__image').alt = `${name}.`;
  cardElement.querySelector('.gallery__image').src = link;

  cardElement.querySelector('.button_type_like').addEventListener('click', toggleLike);

  if (first) {
    galleryContainer.prepend(cardElement);
  } else {
    galleryContainer.append(cardElement);
  }
};

const togglePopup = (popup) => popup.classList.toggle('popup_opened');
const editProfile = () => {
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
  togglePopup(popupEditProfile);
};
const submitProfileForm = (event) => {
  event.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  togglePopup(popupEditProfile);
};
const submitCardForm = (event) => {
  event.preventDefault();
  const cardName = addCardForm.querySelector('.popup__input_property_name').value;
  const cardLink = addCardForm.querySelector('.popup__input_property_link').value;
  addCard(cardName, cardLink);
  addCardForm.reset();
  togglePopup(popupAddCard);
};

initialCards.forEach((card) => addCard(card.name, card.link, false));

closeButtons.forEach((button) => {
  button.addEventListener('click', (event) => togglePopup(event.target.closest('.popup')));
});
addCardButton.addEventListener('click', () => togglePopup(popupAddCard));
editButton.addEventListener('click', editProfile);
userProfileForm.addEventListener('submit', submitProfileForm);
addCardForm.addEventListener('submit', submitCardForm);
