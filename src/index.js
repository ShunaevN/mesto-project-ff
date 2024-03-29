import '../pages/index.css';
import {createCard, likeCard} from './components/card.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {addNewCard, deleteCardRequest, getUserInfo, getCardsInfo, changeAvatar, toEditUsersProfile} from './components/api.js';
import {openModal, closeModal} from './components/modal.js';

let userData;
const initialCards = [];
let transferDeletedCardId;

const globalConfigSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }

const userInfo = getUserInfo();
const cardsInfo = getCardsInfo();

const content = document.querySelector('.content');
const cardContainer = content.querySelector('.places__list');

const newCardPopup = document.querySelector('.popup_type_new-card');
const inputTypeCard = newCardPopup.querySelector('.popup__input_type_card-name');
const inputTypeUrl = newCardPopup.querySelector('.popup__input_type_url');
const newImagePopupButtonRenderIsLoading = newCardPopup.querySelector('.button');

const editImageProfile = document.querySelector('.popup_type_profile_image');
const urlEditImageProfile = editImageProfile.querySelector('.popup__input_type_url');
const newProfileImagePopupButtonRenderIsLoading = editImageProfile.querySelector('.button');

const profileNameInput = document.querySelector('.profile__title');
const profileAboutInput = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const editButtonProfile = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const profilePopup = document.querySelector('.popup_type_edit');
const profilePopupButtonRenderIsLoading = profilePopup.querySelector('.button');
const inputName = profilePopup.querySelector('.popup__input_type_name');
const inputDescription = profilePopup.querySelector('.popup__input_type_description');

const approveDeleteImage = document.querySelector('.popup_type_approve_delete');
const headerFavoriteButton = document.querySelector('.profile__favorite-button');

const imagePopup = document.querySelector('.popup_type_image');
const tagImageOfImagePopup = imagePopup.querySelector('.popup__image');
const tagParagraphOfImagePopup = imagePopup.querySelector('.popup__caption');
const tagAuthorOfImagePopup = imagePopup.querySelector('.popup__author');


function renderLoading(button, isLoading) {
    if (isLoading) {
        button.textContent = "Сохранение...";
    }
    else {
        button.textContent = "Сохранить";
    }
}


Promise.all([userInfo, cardsInfo])
    .then((data) =>{
                profileNameInput.textContent = data[0].name;
                profileAboutInput.textContent = data[0].about;
                profileImage.style.backgroundImage = `url(${data[0].avatar})`;
                userData = data[0];
            
            data[1].forEach(element => 
                {  // index 1 is index of card's object
                    initialCards.push(element);
                });
            toShowCards(initialCards, cardContainer, data[0]);
    })
    .catch((err) => {
             console.log(err); 
    });


function setClearPopupInput(popup) {
    const inputList = Array.from(popup.querySelectorAll('.popup__input'));
    inputList.forEach(input =>  input.value = '');     
}


editButtonProfile.addEventListener('click', () => {
    clearValidation(profilePopup, globalConfigSelectors);
    openProfilePopup(profilePopup);
});


addCardButton.addEventListener('click', () => {
   
    openModal(newCardPopup);
});


profileImage.addEventListener('click', () => {
    openModal(editImageProfile);
});


headerFavoriteButton.addEventListener('click', () => {
    headerFavoriteButton.classList.toggle('profile__favorite-button_is-active');
    toShowCards(initialCards, cardContainer, userData);  
})


// Нажимаем на кнопку и определяем какой попап является родителем у этой кнопки
profilePopup.addEventListener('submit', function(evt) {
    evt.preventDefault();
    renderLoading(evt.target.querySelector('.button'), true);
    toEditProfilePopup();
    closeModal(profilePopup);
});


newCardPopup.addEventListener('submit', function(evt) {
    evt.preventDefault();
    renderLoading(evt.target.querySelector('.button'), true);
    toEditCardPopup();
    closeModal(newCardPopup);
});


editImageProfile.addEventListener('submit', function(evt) {
    evt.preventDefault();
    renderLoading(evt.target.querySelector('.button'), true)
    toEditProfileImagePopup(urlEditImageProfile.value);
    setClearPopupInput(editImageProfile);
    closeModal(editImageProfile);
    
})

function deleteCardCallback(id){
  openModal(approveDeleteImage);
  transferDeletedCardId = id;
}

approveDeleteImage.addEventListener('submit', function(evt) {
    evt.preventDefault();
    deleteCard(transferDeletedCardId);
    closeModal(approveDeleteImage);
})


function toEditProfileImagePopup(url){
    changeAvatar(url)
    .then((user)=> {
        profileImage.style.backgroundImage = `url(${user.avatar})`;
        newProfileImagePopupButtonRenderIsLoading.classList.add('popup__button_disabled');
        newProfileImagePopupButtonRenderIsLoading.disabled = true;
        
    })
    .catch((err) => {
        console.log(err); 
      })
    .finally(() => {
        renderLoading(newProfileImagePopupButtonRenderIsLoading, false);
    })
}


function toEditProfilePopup(){
    toEditUsersProfile(inputName.value, inputDescription.value)
    .then((user) => {
        profileAboutInput.textContent = user.about;
        profileNameInput.textContent = user.name;
    })
    .catch((err) => {
        console.log(err); 
      })
    .finally(() => {
        renderLoading(profilePopupButtonRenderIsLoading, false);
    })  
}


function openProfilePopup(popup) {
    inputName.value = profileNameInput.textContent;
    inputDescription.value = profileAboutInput.textContent;
    openModal(popup);
} 


function deleteCard(id) {
    deleteCardRequest(id)
    .then(() => {
       for (let i = 0; i < initialCards.length; i++){
        if (initialCards[i]._id === id) {
            initialCards.splice(i, 1);
            break
        }
       }
       toShowCards(initialCards, cardContainer, userData);  
   })
   .catch((err) => {
       console.log(err); 
  });
}

// Функция зума карточки - передается как параметр в createCard.
// Из импортированного imagePopup забираем в отлеьные переменные теги img и p по классам
// С помощью setAttribute устанавливаем необходимые значения атрибутов
function zoomCard(event) {
  openModal(imagePopup);
  tagImageOfImagePopup.setAttribute("src", event.target.src)
  tagImageOfImagePopup.setAttribute("alt", `Фотография ${event.target.alt}`)
  tagParagraphOfImagePopup.textContent = event.target.alt;
  tagAuthorOfImagePopup.textContent = event.target.parentElement.querySelector('.card__author').textContent;
}

// Функция лайка карточки - передается как параметр в createCard.
// Функционал реализован через добавдение/удаление соответсвующего класса


// Функция отрисовки карточки. Цикл из прошлого проекта был вынесен в отдельную функцию, так
// как понадобилось отрисовывать карточки каждый раз при добавлении новой карточки
// перед каждым вызовом очищаем тег ul от ранее созданных карточек, чтобы избежать дублирования
// Функция принимает на вход параметры - список карточек и контейнер для вставки
function toShowCards(cardList, container, usersData) {
  container.innerHTML = "";
  cardList.forEach(function (element){
    const card = createCard(element, setFavorite, deleteCardCallback, likeCard, zoomCard, usersData);
    if (card){
      container.append(card);
    }
    
  });
}

// Функция добавления карточки. Принимает на вход попап с которого мы забираем название и ссылку. 
// Функция будет экспортирована и использована в index.js
// При добавлении карточки в объект, вызывается функция отрисовки карточек.
// Параметры - массив карточек и DOM-элемент для вставки

function toEditCardPopup(){
  addNewCard(inputTypeCard.value, inputTypeUrl.value)
  .then((card) => {
      initialCards.unshift(card);
      toShowCards(initialCards, cardContainer, userData);
      setClearPopupInput(newCardPopup);
      newImagePopupButtonRenderIsLoading.classList.add('popup__button_disabled');
      newImagePopupButtonRenderIsLoading .disabled = true;  
  })
  .catch((err) => {
    console.log(err); 
  })
  .finally(() => {
      renderLoading(newImagePopupButtonRenderIsLoading, false);
  })
}

function setFavorite(event, id) {
  event.target.classList.toggle("card__favorite-button_is-active");
  if (event.target.classList.contains("card__favorite-button_is-active")){
    localStorage.setItem(id, 'favorite');
  }
  else {
    localStorage.removeItem(id);
  }
}


enableValidation(globalConfigSelectors);




