const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
  };

  // Проверка валидности

  const hasValidInput = (inputList) => {
    return inputList.every((inputElement) => inputElement.validity.valid);
  };

  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  // Включение и отключение submit
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasValidInput(inputList)) {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.disabled = '';
    } else {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.disabled = 'disabled';
    }
  };

  // Отображение ошибки
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
    inputElement.classList.add(config.inputErrorClass);
  };

  // Скрытие ошибки
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  };

  // Добавление обработчиков
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  const enableValidation = (config) => {
    const { formSelector, ...rest } = config;
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (e) => e.preventDefault());
      setEventListeners(formElement);
    });
  };

  enableValidation(config);
