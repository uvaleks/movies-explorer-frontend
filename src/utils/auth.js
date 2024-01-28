const BASE_URL = 'https://api.uvaleks.nomoredomainsmonster.ru';

const _checkResponse = (res) => {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const register = (inputFields) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(inputFields)
  })
  .then(_checkResponse)
};

export const authorize = (inputFields) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputFields)
  })
  .then(_checkResponse)
};

export const signout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    credentials: 'include',
  })
  .then(_checkResponse)
};

export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: 'include',
  })
  .then(_checkResponse)
}


