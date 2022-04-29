import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open(card) {
    const image = this._element.querySelector('.preview__image');
    const title = this._element.querySelector('.preview__title');
    const name = card.getName();

    title.textContent = name;
    image.alt = name;
    image.src = card.getLink();

    super.open();
  }
}
