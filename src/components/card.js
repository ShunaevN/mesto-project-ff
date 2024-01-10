import { imagePopup } from "..";
import { openModal } from "./modal";

// Функция создания карточки. Принимает на вход название, ссылку, функцию удаления, лайка, зума.
export function createCard(title, link, deleteFunction, likeFunction, zoomImageFunction) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');

    deleteButton.addEventListener('click', deleteFunction);
    likeButton.addEventListener('click', likeFunction);
    cardImage.addEventListener('click', zoomImageFunction);

    cardElement.querySelector('.card__title').textContent = title;
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = title;

    return cardElement;
  }

// Функция удаления карточки - передается как параметр в createCard
export function deleteCard(event) {
    event.target.closest('.places__item').remove();
}

// Функция зума карточки - передается как параметр в createCard.
// Из импортированного imagePopup забираем в отлеьные переменные теги img и p по классам
// С помощью setAttribute устанавливаем необходимые значения атрибутов
export function zoomCard(event) {
  openModal(imagePopup);
  const tagImageOfImagePopup = imagePopup.querySelector('.popup__image');
  const tagParagraphOfImagePopup = imagePopup.querySelector('.popup__caption');
  tagImageOfImagePopup.setAttribute("src", event.target.src)
  tagImageOfImagePopup.setAttribute("alt", `Фотография ${event.target.alt}`)
  tagParagraphOfImagePopup.textContent = event.target.alt;
}

// Функция лайка карточки - передается как параметр в createCard.
// Функционал реализован через добавдение/удаление соответсвующего класса
export function likeCard(event) {
  if (!event.target.classList.contains("card__like-button_is-active")) {
    event.target.classList.add("card__like-button_is-active");
  }
  else {
    event.target.classList.remove("card__like-button_is-active");
  }
  
}

// Функция отрисовки карточки. Цикл из прошлого проекта был вынесен в отдельную функцию, так
// как понадобилось отрисовывать карточки каждый раз при добавлении новой карточки
// перед каждым вызовом очищаем тег ul от ранее созданных карточек, чтобы избежать дублирования
// Функция принимает на вход параметры - список карточек и контейнер для вставки
export function toShowCards(cardList, container) {
  container.innerHTML = "";
  cardList.forEach(function (element){
    container.append(createCard(element.name, element.link, deleteCard, likeCard, zoomCard));
  });
}
