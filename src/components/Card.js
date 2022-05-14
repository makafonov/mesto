export default class {
  constructor({ data, handleCardClick, handleLikeClick, handleDeleteClick }, templateSelector) {
    this._cardData = data;
    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.gallery__item')
      .cloneNode(true);
  }

  _setEventListeners() {
    this._imageElement.addEventListener('click', () => this._handleCardClick(this));
    this._element
      .querySelector('.button_type_like')
      .addEventListener('click', () => this._handleLikeClick(this));

    if (this._deleteButton !== null) {
      this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this));
    }
  }

  getName() {
    return this._cardData.name;
  }

  getLink() {
    return this._cardData.link;
  }

  getId() {
    return this._cardData._id;
  }

  remove = () => {
    this._element.remove();
    this._element = null;
  };

  isLiked() {
    return this._cardData.likes.some((user) => user._id === this._cardData.currentUserId);
  }

  updateLikes(data) {
    this._cardData.likes = data.likes;
    this._processLikes();
  }

  _processLikes() {
    if (this.isLiked()) {
      this._likeButton.classList.add('button_type_like-active');
    } else {
      this._likeButton.classList.remove('button_type_like-active');
    }
    this._likeCounter.textContent = this._cardData.likes.length;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector('.gallery__image');
    this._deleteButton = this._element.querySelector('.button_type_trash');
    this._likeButton = this._element.querySelector('.button_type_like');
    this._likeCounter = this._element.querySelector('.gallery__like-counter');

    if (this._cardData.owner._id !== this._cardData.currentUserId) {
      this._deleteButton.remove();
    }
    this._processLikes();

    this._setEventListeners();
    this._element.querySelector('.gallery__title').textContent = this.getName();
    this._imageElement.alt = this.getName();
    this._imageElement.src = this.getLink();

    return this._element;
  }
}
