const editButton = document.querySelector('.button_type_edit');
const closeButton = document.querySelector('.button_type_close');
const popup = document.querySelector('.popup');
const userProfileForm = document.forms.userProfile;
const nameInput = userProfileForm.querySelector('.popup__input_property_name');
const descriptionInput = userProfileForm.querySelector('.popup__input_property_description');
const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__description');
const galleryContainer = document.querySelector('.gallery');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const addCard = (name, link) => {
  const cardTemplate = document.querySelector('#gallery-item-template').content;
  const cardElement = cardTemplate.querySelector('.gallery__item').cloneNode(true);

  cardElement.querySelector('.gallery__title').textContent = name;
  cardElement.querySelector('.gallery__image').alt = `${name}.`;
  cardElement.querySelector('.gallery__image').src = link;

  galleryContainer.append(cardElement);
};

const renderCards = () => {
  initialCards.forEach((card) => {
    addCard(card.name, card.link);
  })
}

renderCards();

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

function editProfile() {
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
  togglePopup();
}

function submitProfileForm(event) {
  event.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  togglePopup();
}

closeButton.addEventListener('click', togglePopup);
editButton.addEventListener('click', editProfile);
userProfileForm.addEventListener('submit', submitProfileForm);
