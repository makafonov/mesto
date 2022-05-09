export default class {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _processResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _get(path) {
    return fetch(`${this._baseUrl}${path}`, {
      headers: this._headers,
    }).then(this._processResponse);
  }

  getUserInfo() {
    return this._get('/users/me');
  }

  getInitialCards() {
    return this._get('/cards');
  }

  updateUserInfo({ name, description }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about: description,
      }),
    }).then(this._processResponse);
  }
}
