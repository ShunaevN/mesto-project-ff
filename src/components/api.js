const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-5',
    headers: {
      authorization: 'f6d0d490-45ba-457d-83ab-b74eefa51750',
      'Content-Type': 'application/json'
    }
  }

function checkValidityResponse(response) {
    if (response.ok) {
        return response.json()
    }
    return Promise.reject(`Ошибка: ${response.status}`);
}

export function getUserInfo(){
    return fetch(`${config.baseUrl}/users/me`, {
    headers: {
        authorization: config.headers.authorization
    }
    })
    .then(res => checkValidityResponse(res));
}

export function getCardsInfo() {
    return fetch(`${config.baseUrl}/cards`, {
    headers: {
        authorization: config.headers.authorization
    }
    })
    .then(res => checkValidityResponse(res));
}

export function toEditUsersProfile(userName, userAbout){
    return fetch(`${config.baseUrl}/users/me`, 
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
    })
    .then(res => checkValidityResponse(res));
}

export function addNewCard(cardName, cardLink){
    return fetch(`${config.baseUrl}/cards`, 
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
    })
    .then(res => checkValidityResponse(res));
    
}

export function deleteCardRequest(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, 
    {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization},
    })
    .then(res => checkValidityResponse(res));
}

export function putLikeRequest(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, 
    {
        method: 'PUT',
        headers: {
            authorization: config.headers.authorization},
    })
    .then(res => checkValidityResponse(res));
    
}

export function deleteLikeRequest(cardId) {
  
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, 
    {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization},
    })
    .then(res => checkValidityResponse(res));
}

export function changeAvatar(newAvatarUrl) {
    return fetch(`${config.baseUrl}/users/me/avatar`, 
    {
        method: 'PATCH',
        headers: {
                authorization: config.headers.authorization,
                'Content-Type': config.headers["Content-Type"]
                },
        body: JSON.stringify({
                avatar: newAvatarUrl
            })
    })
    .then(res => checkValidityResponse(res));
}
