import { openModal } from "./modal";
import { userData } from "..";
import { cardContainer, initialCards, renderLoading } from "..";
import { addNewCard, deleteCardRequest, putLikeRequest, deleteLikeRequest} from "./api";


const imagePopup = document.querySelector('.popup_type_image');
const tagImageOfImagePopup = imagePopup.querySelector('.popup__image');
const tagParagraphOfImagePopup = imagePopup.querySelector('.popup__caption');
const tagAuthorOfImagePopup = imagePopup.querySelector('.popup__author');

const newCardPopup = document.querySelector('.popup_type_new-card');
const inputTypeCard = newCardPopup.querySelector('.popup__input_type_card-name');
const inputTypeUrl = newCardPopup.querySelector('.popup__input_type_url');
const newImagePopupButtonRenderIsLoading = newCardPopup.querySelector('.button');

export let transferDeletedCardId;  // save and transfer key to index.js and call deleteCard function
export const approveDeleteImage = document.querySelector('.popup_type_approve_delete');

// Функция создания карточки. Принимает на вход название, ссылку, функцию удаления, лайка, зума.
export function createCard(card, deleteFunction, favoriteFunction, likeFunction, zoomImageFunction, userData) {
  if (localStorage.getItem(card._id) !== 'block'){
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const blockButton = cardElement.querySelector('.card__block-button');
    const favoriteButton = cardElement.querySelector('.card__favorite-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');

    deleteButton.addEventListener('click', function(){
      openModal(approveDeleteImage);
      transferDeletedCardId = card._id;
    });
    likeButton.addEventListener('click', (event) => {likeFunction(event, card);});
    cardImage.addEventListener('click', zoomImageFunction);

    favoriteButton.addEventListener('click', (evt) =>{
      favoriteFunction(evt, card._id);
    
    }
      );
    
    blockButton.addEventListener('click', (evt) => {
      localStorage.setItem(card._id, 'block');
      evt.target.parentElement.remove();
    });

    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__author').textContent = `Автор: ${card.owner.name}`;
    
    // Проверка на принадлежность автора карточке
    if (userData._id !== card.owner._id) {
      deleteButton.remove();
    }
    else {
      blockButton.remove();
    }

    // Проверка на нахождение пользователя в списке пользователей карточки, которые поставили лайк
    for (let i = 0; i < card.likes.length; i++){
      if (userData._id === card.likes[i]._id) {
        likeButton.classList.add('card__like-button_is-active');
      }
    }

      if (localStorage[card._id] === "favorite") {
        favoriteButton.classList.add("card__favorite-button_is-active");
      }
  
    
    cardElement.querySelector('.card__likes').textContent = card.likes.length;

    return cardElement;
  }
  }

// Функция удаления карточки - передается как параметр в createCard
export function deleteCard(id) {
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
export function zoomCard(event) {
  openModal(imagePopup);
  tagImageOfImagePopup.setAttribute("src", event.target.src)
  tagImageOfImagePopup.setAttribute("alt", `Фотография ${event.target.alt}`)
  tagParagraphOfImagePopup.textContent = event.target.alt;
  tagAuthorOfImagePopup.textContent = event.target.parentElement.querySelector('.card__author').textContent;

}

// Функция лайка карточки - передается как параметр в createCard.
// Функционал реализован через добавдение/удаление соответсвующего класса
export function likeCard(event, card) {
  event.target.classList.toggle("card__like-button_is-active");
  if (event.target.classList.contains("card__like-button_is-active"))
    {
      putLikeRequest(card._id).then((count) => 
        {
          event.target.parentElement.querySelector('.card__likes').textContent = count.likes.length;
        });
    }
  else 
    {
      deleteLikeRequest(card._id).then((count) => 
        {
          event.target.parentElement.querySelector('.card__likes').textContent = count.likes.length;
        });
    }
}

// Функция отрисовки карточки. Цикл из прошлого проекта был вынесен в отдельную функцию, так
// как понадобилось отрисовывать карточки каждый раз при добавлении новой карточки
// перед каждым вызовом очищаем тег ul от ранее созданных карточек, чтобы избежать дублирования
// Функция принимает на вход параметры - список карточек и контейнер для вставки
export function toShowCards(cardList, container, usersData) {
  container.innerHTML = "";
  cardList.forEach(function (element){
    const card = createCard(element, deleteCard, setFavorite, likeCard, zoomCard, usersData);
    if (card){
      container.append(card);
    }
    
  });
}

// Функция добавления карточки. Принимает на вход попап с которого мы забираем название и ссылку. 
// Функция будет экспортирована и использована в index.js
// При добавлении карточки в объект, вызывается функция отрисовки карточек.
// Параметры - массив карточек и DOM-элемент для вставки

export function toEditCardPopup(){
  addNewCard(inputTypeCard.value, inputTypeUrl.value)
  .then((card) => {
      initialCards.unshift(card);
      toShowCards(initialCards, cardContainer, userData);  
  })
  .catch((err) => {
    console.log(err); 
  })
  .finally(() => {
      renderLoading(newImagePopupButtonRenderIsLoading, false);
  })
}


// ----------------------

function setFavorite(event, id) {
  event.target.classList.toggle("card__favorite-button_is-active");
  if (event.target.classList.contains("card__favorite-button_is-active")){
    localStorage.setItem(id, 'favorite');
  }
  else {
    localStorage.removeItem(id);
  }
  console.log(localStorage);
}

