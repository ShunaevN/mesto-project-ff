const showInputError = (objectConfig, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(objectConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(objectConfig.errorClass);
  };

  const hideInputError = (objectConfig, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(objectConfig.inputErrorClass);
    errorElement.classList.remove(objectConfig.errorClass);
    errorElement.textContent = '';
  };

  const checkInputValidity = (objectConfig, formElement, inputElement) => {

    if (inputElement.validity.patternMismatch) {
        // встроенный метод setCustomValidity принимает на вход строку
        // и заменяет ею стандартное сообщение об ошибке
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        // если передать пустую строку, то будут доступны
        // стандартные браузерные сообщения
        inputElement.setCustomValidity("");
     }
    if (!inputElement.validity.valid) {
      showInputError(objectConfig, formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(objectConfig, formElement, inputElement);
    }
  };

  const hasInvalidInput = (inputList) => {
    
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  const toggleButtonState = (objectConfig, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(objectConfig.inactiveButtonClass);
      buttonElement.disabled = true;
    }
    else {
      buttonElement.classList.remove(objectConfig.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  const setEventListeners = (objectConfig, formElement) => {
    
    const inputList = Array.from(formElement.querySelectorAll(objectConfig.inputSelector));
    const buttonElement = formElement.querySelector(objectConfig.submitButtonSelector);
    toggleButtonState(objectConfig, inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(objectConfig, formElement, inputElement);
        toggleButtonState(objectConfig, inputList, buttonElement);
      });
    });
  };

  export const enableValidation = (objectConfig) => {
    const formList = Array.from(document.querySelectorAll(objectConfig.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(objectConfig, formElement);
    });
  };

