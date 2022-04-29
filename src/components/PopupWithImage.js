import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._element.querySelector('.preview__image');
    this._title = this._element.querySelector('.preview__title');
  }

  open(card) {
    const name = card.getName();
    this._title.textContent = name;
    this._image.alt = name;
    this._image.src = card.getLink();
    super.open();
  }
}
