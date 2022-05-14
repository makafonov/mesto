export default class {
  constructor(containerSelector, renderer) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element, first = true) {
    if (first) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
}
