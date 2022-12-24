class FormValidator {
  constructor(config, formElement) {
  this._formSelector= config.formSelector;
  this._inputSelector = config.inputSelector;
  this._submitButtonSelector = config.submitButtonSelector;
  this._inactiveButtonClass = config.inactiveButtonClass;
  this._inputErrorClass = config.inputErrorClass;
  this._errorClass = config.errorClass;

  this._formElement = formElement;
  }


// Проверка валидности

_hasValidInput = (inputList) => {
  return inputList.every((inputElement) => inputElement.validity.valid);
};


_checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    this._showInputError(this._formElement, inputElement, inputElement.validationMessage);
  } else {
    this._hideInputError(this._formElement, inputElement);
  }
};

// Включение и отключение submit
_toggleButtonState = (inputList, buttonElement) => {
  if (this._hasValidInput(inputList)) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disabled = '';
  } else {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = 'disabled';
  }
};

// Отображение ошибки
_showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._errorClass);
  inputElement.classList.add(this._inputErrorClass);
};

// Скрытие ошибки
_hideInputError = (formElement, inputElement) => {
  const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = '';
};

// Добавление обработчиков
_setEventListeners = () => {
  const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  const buttonElement =  this._formElement.querySelector(this._submitButtonSelector);
  this._toggleButtonState(inputList, buttonElement);
  this._formElement.addEventListener('reset', () => {
    setTimeout(() => {
      this._toggleButtonState(inputList, buttonElement);
    }, 0);
  });


  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(this._formElement, inputElement);
      this._toggleButtonState(inputList, buttonElement);
    });
  });
};

 enableValidation = () => {
  this._formElement.addEventListener('submit', (e) => e.preventDefault());
  this._setEventListeners();

};
}

// объект настроек
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

// Вызов валидации
const formValidate = (() => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(config, formElement)
    formValidator.enableValidation();
  });
})();

