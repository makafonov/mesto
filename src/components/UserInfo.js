export default class {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._description.textContent = about;
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }
}
