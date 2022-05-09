export default class {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _get(path) {
    return fetch(`${this._baseUrl}${path}`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserInfo() {
    return this._get('/users/me');
  }

  getInitialCards() {
    return this._get('/cards');
  }
}
