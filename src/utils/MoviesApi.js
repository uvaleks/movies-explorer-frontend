class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
  
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    _request(url, options) {
        return fetch(this._baseUrl + url, options)
        .then(this._checkResponse)
    }

    getMovies() {
        return this._request('/', {
            headers: this._headers
        })
    }

    postCard({name, link}) {
        return this._request('/cards', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
    }

    patchAvatar(link) {
        return this._request('/users/me/avatar', {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: link
            })
        })
    }

    changeLikeCardStatus(id, userId, isLiked) {
        if (isLiked) {
            return this._request(`/cards/${id}/likes`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {
            return this._request(`/cards/${id}/likes`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    deleteCard(id) {
        return this._request(`/cards/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    getUserInfo() {
        return this._request('/users/me', {
            credentials: 'include',
            headers: this._headers
        })
    }

    patchUserInfo(inputFields) {
        return this._request('/users/me', {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputFields)
        })
    }
}

const MoviesApi = new Api({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  });

export default MoviesApi;