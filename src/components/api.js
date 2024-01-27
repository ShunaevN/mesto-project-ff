const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-5',
    headers: {
      authorization: 'f6d0d490-45ba-457d-83ab-b74eefa51750',
      'Content-Type': 'application/json'
    }
  }

export function getUserInfo(){
    return fetch(`${config.baseUrl}/users/me`, {
    headers: {
        authorization: config.headers.authorization
    }
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function getCardsInfo() {
    return fetch(`${config.baseUrl}/cards`, {
    headers: {
        authorization: config.headers.authorization
    }
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function toEditUsersProfile(userName, userAbout){
    fetch(`${config.baseUrl}/users/me`, 
    {
        method: 'PATCH',
        headers: {
                authorization: config.headers.authorization,
                'Content-Type': config.headers["Content-Type"]
                },
        body: JSON.stringify({
                name: userName,
                about: userAbout
            })
    }); 
}

export function addNewCard(cardName, cardLink){
    fetch(`${config.baseUrl}/cards`, 
    {
        method: 'POST',
        headers: {
                authorization: config.headers.authorization,
                'Content-Type': config.headers["Content-Type"]
                },
        body: JSON.stringify({
                name: cardName,
                link: cardLink
            })
    }); 
}

export function deleteCardRequest(cardId) {
    fetch(`${config.baseUrl}/cards/${cardId}`, 
    {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization},
    });
}

export function putLikeRequest(cardId) {
    fetch(`${config.baseUrl}/cards/likes/${cardId}`, 
    {
        method: 'PUT',
        headers: {
            authorization: config.headers.authorization},
    });
}

export function deleteLikeRequest(cardId) {
    fetch(`${config.baseUrl}/cards/likes/${cardId}`, 
    {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization},
    });
}

export function changeAvatar(newAvatarUrl) {
    fetch(`${config.baseUrl}/users/me/avatar`, 
    {
        method: 'PATCH',
        headers: {
                authorization: config.headers.authorization,
                'Content-Type': config.headers["Content-Type"]
                },
        body: JSON.stringify({
                avatar: newAvatarUrl
            })
    }); 
}