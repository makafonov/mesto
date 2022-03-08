const editButton = document.querySelector('.button_type_edit');
const closeButton = document.querySelector('.button_type_close');
const popup = document.querySelector('.popup');
const form = document.querySelector('form');
const [nameInput, descriptionInput] = document.querySelectorAll('input');
const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__description');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

closeButton.addEventListener('click', togglePopup);
editButton.addEventListener('click', () => {
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
  togglePopup();
});
form.addEventListener('submit', (event) => {
  event.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  togglePopup();
});
