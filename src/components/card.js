import { openModal } from "./modal";
import { addNewCard, deleteCardRequest, putLikeRequest, deleteLikeRequest, getCardsInfo } from "./api";

const imagePopup = document.querySelector('.popup_type_image');
const tagImageOfImagePopup = imagePopup.querySelector('.popup__image');
const tagParagraphOfImagePopup = imagePopup.querySelector('.popup__caption');

const newCardPopup = document.querySelector('.popup_type_new-card');
const inputTypeCard = newCardPopup.querySelector('.popup__input_type_card-name');
const inputTypeUrl = newCardPopup.querySelector('.popup__input_type_url');

function updateLikes(element, updateCard) {
  element.querySelector('.card__likes').textContent = updateCard.likes.length;
}

// Функция создания карточки. Принимает на вход название, ссылку, функцию удаления, лайка, зума.
export function createCard(card, deleteFunction, likeFunction, zoomImageFunction, userData) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');

    deleteButton.addEventListener('click', function(){
      deleteFunction(card._id);
    });
    likeButton.addEventListener('click', (event) => {likeFunction(event, card);});
    cardImage.addEventListener('click', zoomImageFunction);

    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    

    // Проверка на принадлежность автора карточке
    if (userData._id !== card.owner._id) {
      deleteButton.style.background = "none";
      deleteButton.disabled = true;
    }
    
    // Проверка на нахождение пользователя в списке пользователей карточки, которые поставили лайк
    for (let i = 0; i < card.likes.length; i++){
      if (userData._id === card.likes[i]._id) {
        likeButton.classList.add('card__like-button_is-active');
      }
    }
    updateLikes(cardElement, card);
    return cardElement;
  }

// Функция удаления карточки - передается как параметр в createCard
export function deleteCard(id) {
    deleteCardRequest(id);
}

// Функция зума карточки - передается как параметр в createCard.
// Из импортированного imagePopup забираем в отлеьные переменные теги img и p по классам
// С помощью setAttribute устанавливаем необходимые значения атрибутов
export function zoomCard(event) {
  openModal(imagePopup);
  tagImageOfImagePopup.setAttribute("src", event.target.src)
  tagImageOfImagePopup.setAttribute("alt", `Фотография ${event.target.alt}`)
  tagParagraphOfImagePopup.textContent = event.target.alt;
}

// Функция лайка карточки - передается как параметр в createCard.
// Функционал реализован через добавдение/удаление соответсвующего класса
export function likeCard(event, card) {
  event.target.classList.toggle("card__like-button_is-active");
  if (event.target.classList.contains("card__like-button_is-active")){
    putLikeRequest(card._id)
    
  }
  else {
    deleteLikeRequest(card._id);
  }

}

// Функция отрисовки карточки. Цикл из прошлого проекта был вынесен в отдельную функцию, так
// как понадобилось отрисовывать карточки каждый раз при добавлении новой карточки
// перед каждым вызовом очищаем тег ul от ранее созданных карточек, чтобы избежать дублирования
// Функция принимает на вход параметры - список карточек и контейнер для вставки
export function toShowCards(cardList, container, usersData) {
  container.innerHTML = "";
  cardList.forEach(function (element){
    container.append(createCard(element, deleteCard, likeCard, zoomCard, usersData));
  });
}

// Функция добавления карточки. Принимает на вход попап с которого мы забираем название и ссылку. 
// Функция будет экспортирована и использована в index.js
// При добавлении карточки в объект, вызывается функция отрисовки карточек.
// Параметры - массив карточек и DOM-элемент для вставки

export function toEditCardPopup(){
  addNewCard(inputTypeCard.value, inputTypeUrl.value);
}