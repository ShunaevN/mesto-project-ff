import '../pages/index.css';
// @todo: Темплейт карточки
import {initialCards} from '../scripts/cards.js';

const content = document.querySelector('.content');
const cardContainer = content.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(title, link, deleteFunction) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteFunction);
    cardElement.querySelector('.card__title').textContent = title;
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = title;
    return cardElement;
  }
// @todo: Функция удаления карточки
function deleteCard(event) {
    event.target.closest('.places__item').remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function (element){
    cardContainer.append(createCard(element.name, element.link, deleteCard));
});

