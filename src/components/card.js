import { openModal } from "./modal";

const headerFavoriteButton = document.querySelector('.profile__favorite-button');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');
const approveDeleteImage = document.querySelector('.popup_type_approve_delete');
export let transferDeletedCardId;

// Функция создания карточки. Принимает на вход название, ссылку, функцию удаления, лайка, зума.
export function createCard(card, favoriteFunction, likeFunction, zoomImageFunction, userData) {
  if (localStorage.getItem(card._id) !== 'block'){
    // const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
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
    cardImage.src = card.link;
    cardImage.alt = card.name;
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

    if (headerFavoriteButton.classList.contains('profile__favorite-button_is-active')){
      
      if (favoriteButton.classList.contains('card__favorite-button_is-active')){
        return cardElement;
      }
    }
    else{
      return cardElement;
    }
    
  }
  }