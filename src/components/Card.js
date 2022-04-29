export default class {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.gallery__item')
      .cloneNode(true);
  }

  _toggleLike(event) {
    event.target.classList.toggle('button_type_like-active');
  }

  _remove = () => {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.button_type_like').addEventListener('click', this._toggleLike);
    this._element.querySelector('.button_type_trash').addEventListener('click', this._remove);
    this._imageElement.addEventListener('click', () => this._handleCardClick(this));
  }

  getName() {
    return this._name;
  }

  getLink() {
    return this._link;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector('.gallery__image');
    this._setEventListeners();

    this._element.querySelector('.gallery__title').textContent = this._name;
    this._imageElement.alt = this._name;
    this._imageElement.src = this._link;

    return this._element;
  }
}
