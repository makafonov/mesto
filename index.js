const editButton = document.querySelector('.button_type_edit');
const closeButton = document.querySelector('.button_type_close');
const popup = document.querySelector('.popup');
const userProfileForm = document.forms.userProfile;
const nameInput = userProfileForm.querySelector('.popup__input_property_name');
const descriptionInput = userProfileForm.querySelector('.popup__input_property_description');
const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__description');

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
