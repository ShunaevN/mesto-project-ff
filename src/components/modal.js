import { profileNameInput, profileAboutInput} from '../index.js';

export const profilePopup = document.querySelector('.popup_type_edit');
const inputName = profilePopup.querySelector('.popup__input_type_name');
const inputDescription = profilePopup.querySelector('.popup__input_type_description');

function closeButtonIsClicked(event){
    const targetClassList = event.target.classList; // запишем в переменную класс элемента, на котором произошло событие
    if (targetClassList.contains('popup') || targetClassList.contains('popup__close')) { // проверяем наличие класса попапа ИЛИ кнопки закрытия
        closeModal(document.querySelector('.popup_is-opened')); // если один из классов присутствует, то закрываем попап
    }
}

function escapeButtonIsClicked(event){
     // запишем в переменную класс элемента, на котором произошло событие
    if (event.key === "Escape") { // проверяем наличие класса попапа ИЛИ кнопки закрытия
        closeModal(document.querySelector('.popup_is-opened')); // если один из классов присутствует, то закрываем попап
    }
}

// Функция открытия модального окна. Принимает на вход попап, который необходимо открыть.
// Реализация функции основана на добавлении/удалении соответствующего класса
export function openModal(popup) {
    popup.classList.add("popup_is-animated");
    setTimeout(function () {
        popup.classList.add("popup_is-opened");
    }, 100);

    popup.addEventListener('mouseup', closeButtonIsClicked);
    document.addEventListener('keydown', escapeButtonIsClicked);

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
    popup.removeEventListener('mouseup', closeButtonIsClicked);
    document.removeEventListener('keydown', escapeButtonIsClicked);
}

// Функция изменения значений имени и о себе. Принимает на вход поля, в котрые будем вставлять значения
// и попап, с которого мы забираем эти значения. Функция будет экспортирована и использована в index.js
export function toEditProfilePopup(name, about){
    name.textContent = inputName.value;
    about.textContent = inputDescription.value;
}





