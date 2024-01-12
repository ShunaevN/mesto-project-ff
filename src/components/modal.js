import { profileNameInput, profileAboutInput} from '../index.js';

export const profilePopup = document.querySelector('.popup_type_edit');
const inputName = profilePopup.querySelector('.popup__input_type_name');
const inputDescription = profilePopup.querySelector('.popup__input_type_description');



// Функция открытия модального окна. Принимает на вход попап, который необходимо открыть.
// Реализация функции основана на добавлении/удалении соответствующего класса
export function openModal(popup) {
    popup.classList.add("popup_is-animated");
    setTimeout(function () {
        popup.classList.add("popup_is-opened");
    }, 100);

    // Если переданный попап - редактирование профиля - то забираем поля имени и о себе и вставляем в попап.
    // Глобальные поля имени и о себе были импортированы выше

}

export function openPropfilePopup(popup) { 
    inputName.value = profileNameInput.textContent;
    inputDescription.value = profileAboutInput.textContent;
    openModal(popup);
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
    name.textContent = inputName.value;
    about.textContent = inputDescription.value;
}

// Функция добавления карточки. Принимает на вход попап с которого мы забираем название и ссылку. 
// Функция будет экспортирована и использована в index.js
// При добавлении карточки в объект, вызывается функция отрисовки карточек.
// Параметры - массив карточек и DOM-элемент для вставки



