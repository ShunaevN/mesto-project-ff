import '../pages/index.css';
import {initialCards} from '../scripts/cards.js';
import {toShowCards, toEditCardPopup} from './components/card.js';
import {openModal, closeModal, toEditProfilePopup, openPropfilePopup, profilePopup} from './components/modal.js';


const content = document.querySelector('.content');
export const cardContainer = content.querySelector('.places__list');
const newCardPopup = document.querySelector('.popup_type_new-card');
export const profileNameInput = document.querySelector('.profile__title');
export const profileAboutInput = document.querySelector('.profile__description');
const popupList = Array.from(document.querySelectorAll('.popup'));

// Вывести карточки на страницу

toShowCards(initialCards, cardContainer);

// Через делегирование событий и условный оператор вызываем функцию openModal/closeModal, передавая попап
document.addEventListener('click', function(evt){
    if (evt.target.classList.contains('profile__edit-button')){
        openPropfilePopup(profilePopup);
        document.addEventListener('keydown', escapeIsClicked);

    }
    else if (evt.target.classList.contains('profile__add-button')){
        openModal(newCardPopup);
    }

    else if (evt.target.classList.contains('popup__close')){
        // через родителя элемента, выбираем попап, на котором нажат крестик.
        const typeOfPopup = evt.target.parentElement.parentElement;  
        closeModal(typeOfPopup);
        
    }

    else if (evt.target.classList.contains('popup')){
        closeModal(evt.target); 
    }
})

// Проходимся по массиву попапов и снимает с них класс


function escapeIsClicked(evt) {
    if (evt.key === "Escape") {
        closeModal(profilePopup);
        document.removeEventListener('keydown', escapeIsClicked);
    }
}

// Нажимаем на кнопку и определяем какой попап является родителем у этой кнопки
document.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const typePopup = evt.target.parentElement.parentElement;
    if (typePopup.classList.contains('popup_type_edit')) {
        toEditProfilePopup(profileNameInput, profileAboutInput, profilePopup);
        closeModal(profilePopup);
    }
    else if (typePopup.classList.contains('popup_type_new-card')) {
        toEditCardPopup(newCardPopup);
        closeModal(newCardPopup);
    }
})





