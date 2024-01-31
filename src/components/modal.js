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

function setClearPopupInput(popup) {
    const inputList = Array.from(popup.querySelectorAll('.popup__input'));
    inputList.forEach(input =>  input.value = '');
       
}

// Функция открытия модального окна. Принимает на вход попап, который необходимо открыть.
// Реализация функции основана на добавлении/удалении соответствующего класса
export function openModal(popup) {
    setClearPopupInput(popup);
    popup.classList.add("popup_is-animated");
    setTimeout(function () {
        popup.classList.add("popup_is-opened");
    }, 100);

    popup.addEventListener('mouseup', closeButtonIsClicked);
    document.addEventListener('keydown', escapeButtonIsClicked);
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





