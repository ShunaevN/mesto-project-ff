import '../pages/index.css';
import {toShowCards, toEditCardPopup, approveDeleteImage, transferDeletedCardId, deleteCard} from './components/card.js';
import { enableValidation } from './components/validation.js';
import { getUserInfo, getCardsInfo} from './components/api.js';
import {openModal, closeModal, toEditProfilePopup, openPropfilePopup, profilePopup, toEditProfileImagePopup} from './components/modal.js';

const userInfo = getUserInfo();
const cardsInfo = getCardsInfo();

const content = document.querySelector('.content');
export const cardContainer = content.querySelector('.places__list');

const newCardPopup = document.querySelector('.popup_type_new-card');
const editImageProfile = document.querySelector('.popup_type_profile_image');
const urlEditImageProfile = editImageProfile.querySelector('.popup__input_type_url');

export const profileNameInput = document.querySelector('.profile__title');
export const profileAboutInput = document.querySelector('.profile__description');
export const profileImage = document.querySelector('.profile__image');
const editButtonProfile = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

export let userData;
export const initialCards = [];

export function renderLoading(button, isLoading) {
    if (isLoading) {
        button.textContent = "Сохранение...";
    }
    else {
        button.textContent = "Сохранить";
    }
}

const globalConfigSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }

userInfo
    .then((data) =>{
        profileNameInput.textContent = data.name;
        profileAboutInput.textContent = data.about;
        profileImage.style.backgroundImage = `url(${data.avatar})`;
        userData = data;
    })
    .catch((err) => {
        console.log(err);
    });



Promise.all([userInfo, cardsInfo])
    .then((data) =>{
            data[1].forEach(element => 
                {  // index 1 is index of card's object
                    initialCards.push(element);
                });
            toShowCards(initialCards, cardContainer, data[0]);
    })
    .catch((err) => {
             console.log(err); 
    });


editButtonProfile.addEventListener('click', () => {openPropfilePopup(profilePopup);});
addCardButton.addEventListener('click', () => {openModal(newCardPopup);});
profileImage.addEventListener('click', () => {openModal(editImageProfile);});

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
    closeModal(editImageProfile);
})

approveDeleteImage.addEventListener('submit', function(evt) {
    evt.preventDefault();
    deleteCard(transferDeletedCardId);
    closeModal(approveDeleteImage);
})

enableValidation(globalConfigSelectors);





  

