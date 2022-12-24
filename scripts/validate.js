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
    this._showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    this._hideInputError(formElement, inputElement);
  }
};

// Включение и отключение submit
_toggleButtonState = (inputList, buttonElement) => {
  if (this._hasValidInput(inputList)) {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = '';
  } else {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = 'disabled';
  }
};

// Отображение ошибки
_showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
  inputElement.classList.add(config.inputErrorClass);
};

// Скрытие ошибки
_hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

// Добавление обработчиков
_setEventListeners = (formElement, config) => {
  const inputList = Array.from( formElement.querySelectorAll(config.inputSelector));
  const buttonElement =  formElement.querySelector(config.submitButtonSelector);
  this._toggleButtonState(inputList, buttonElement);
  formElement.addEventListener('reset', () => {
    setTimeout(() => {
      this._toggleButtonState(inputList, buttonElement);
    }, 0);
  });


  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(this._formElement, inputElement);
      this._toggleButtonState(inputList, buttonElement);
      // console.log(this._checkInputValidity(formElement, inputElement));
    });
  });
};

 enableValidation = (config, formElement) => {
  // const { formSelector, ...rest } = config;
  formElement.addEventListener('submit', (e) => e.preventDefault());
  this._setEventListeners(formElement, config);

};
}

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};


const formValidate = (() => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const formValidator = new FormValidator(config, formElement)
    formValidator.enableValidation(config, formElement);

  });
})();

