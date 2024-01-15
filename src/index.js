import '../pages/index.css';
import {initialCards} from '../scripts/cards.js';
import {toShowCards, toEditCardPopup} from './components/card.js';
import {openModal, closeModal, toEditProfilePopup, openPropfilePopup, profilePopup} from './components/modal.js';


const content = document.querySelector('.content');
export const cardContainer = content.querySelector('.places__list');
const newCardPopup = document.querySelector('.popup_type_new-card');
export const profileNameInput = document.querySelector('.profile__title');
export const profileAboutInput = document.querySelector('.profile__description');
const editButtonProfile = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// Вывести карточки на страницу

toShowCards(initialCards, cardContainer);

editButtonProfile.addEventListener('click', () => {openPropfilePopup(profilePopup);});
addCardButton.addEventListener('click', () => {openModal(newCardPopup);});


// Нажимаем на кнопку и определяем какой попап является родителем у этой кнопки
profilePopup.addEventListener('submit', function(evt) {
    evt.preventDefault();
    toEditProfilePopup(profileNameInput, profileAboutInput);
    closeModal(profilePopup);
});

newCardPopup.addEventListener('submit', function(evt) {
    evt.preventDefault();
    toEditCardPopup();
    closeModal(newCardPopup);
});



