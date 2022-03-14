const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');

const popupPreview = document.querySelector('.popup_type_preview');
const previewImage = popupPreview.querySelector('.preview__image');
const previewTitle = popupPreview.querySelector('.preview__title');

const userProfileForm = document.forms.userProfile;
const nameInput = userProfileForm.querySelector('.popup__input_property_name');
const descriptionInput = userProfileForm.querySelector('.popup__input_property_description');

const addCardForm = document.forms.addCard;
const cardNameInput = addCardForm.querySelector('.popup__input_property_name');
const cardLinkInput = addCardForm.querySelector('.popup__input_property_link');

const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__description');
const galleryContainer = document.querySelector('.gallery');

const cardTemplate = document.querySelector('#gallery-item-template').content;

const editProfileButton = document.querySelector('.button_type_edit');
const addCardButton = document.querySelector('.button_type_add');
const closeButtonClass = '.button_type_close';
const profileCloseButton = popupEditProfile.querySelector(closeButtonClass);
const cardCloseButton = popupAddCard.querySelector(closeButtonClass);
const previewCloseButton = popupPreview.querySelector(closeButtonClass);

const toggleLike = (event) => event.target.classList.toggle('button_type_like-active');
const openPopup = (popup) => popup.classList.add('popup_opened');
const closePopup = (popup) => popup.classList.remove('popup_opened');
const removeCard = (event) => event.target.closest('.gallery__item').remove();
const renderPreview = (card) => {
  previewTitle.textContent = card.name;
  previewImage.alt = `${card.name}.`;
  previewImage.src = card.link;
  openPopup(popupPreview);
};

const createCard = (card) => {
  const cardElement = cardTemplate.querySelector('.gallery__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.gallery__image');

  cardElement.querySelector('.gallery__title').textContent = card.name;
  cardImage.alt = `${card.name}.`;
  cardImage.src = card.link;

  cardElement.querySelector('.button_type_like').addEventListener('click', toggleLike);
  cardElement.querySelector('.button_type_trash').addEventListener('click', removeCard);
  cardImage.addEventListener('click', () => renderPreview(card));

  return cardElement;
}

const renderCard = (card, first = true) => {
  const cardElement = createCard(card);

  if (first) {
    galleryContainer.prepend(cardElement);
  } else {
    galleryContainer.append(cardElement);
  }
};

const editProfile = () => {
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
  openPopup(popupEditProfile);
};
const submitProfileForm = (event) => {
  event.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  closePopup(popupEditProfile);
};
const submitCardForm = (event) => {
  event.preventDefault();
  renderCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  });
  addCardForm.reset();
  closePopup(popupAddCard);
};

initialCards.forEach((card) => renderCard(card, false));

profileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
cardCloseButton.addEventListener('click', () => closePopup(popupAddCard));
previewCloseButton.addEventListener('click', () => closePopup(popupPreview));
addCardButton.addEventListener('click', () => openPopup(popupAddCard));
editProfileButton.addEventListener('click', editProfile);

userProfileForm.addEventListener('submit', submitProfileForm);
addCardForm.addEventListener('submit', submitCardForm);
