import { profileNameInput, profileAboutInput, cardContainer } from '../index.js';
import { initialCards } from '../../scripts/cards.js';
import { toShowCards } from './card.js';


// Функция открытия модального окна. Принимает на вход попап, который необходимо открыть.
// Реализация функции основана на добавлении/удалении соответствующего класса
export function openModal(popup) {
    popup.classList.add("popup_is-animated");
    setTimeout(function () {
        
        popup.classList.add("popup_is-opened");
    }, 100);

    // Если переданный попап - редактирование профиля - то забираем поля имени и о себе и вставляем в попап.
    // Глобальные поля имени и о себе были импортированы выше
    if (popup.classList.contains("popup_type_edit")){
        popup.querySelector('.popup__input_type_name').value = profileNameInput.textContent;
        popup.querySelector('.popup__input_type_description').value = profileAboutInput.textContent;
    }
}

// Функция закрытия модального окна. Принимает на вход попап, который необходимо закрыть.
// Реализация функции основана на добавлении/удалении соответствующего класса
export function closeModal(popup) {
    popup.classList.remove("popup_is-opened");
    setTimeout(function () {
        popup.classList.remove("popup_is-animated");
    }, 1000); 
    
}

// Функция изменения значений имени и о себе. Принимает на вход поля, в котрые будем вставлять значения
// и попап, с которого мы забираем эти значения. Функция будет экспортирована и использована в index.js
export function toEditProfilePopup(name, about, popup){
    name.textContent = popup.querySelector('.popup__input_type_name').value;
    about.textContent = popup.querySelector('.popup__input_type_description').value;

}

// Функция добавления карточки. Принимает на вход попап с которого мы забираем название и ссылку. 
// Функция будет экспортирована и использована в index.js
// При добавлении карточки в объект, вызывается функция отрисовки карточек.
// Параметры - массив карточек и DOM-элемент для вставки
export function toEditCardPopup(popup){
    const key = popup.querySelector('.popup__input_type_card-name').value;
    const value = popup.querySelector('.popup__input_type_url').value;
    initialCards.unshift(
        {
            name: key,
            link: value,
        }
    );
    
    toShowCards(initialCards, cardContainer);
}


