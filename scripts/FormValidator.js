class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formSelector = config.formSelector;
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

  _checkInputValidity = (inputElement) => {
    this._hideInputError(inputElement);
    if (!inputElement.validity.valid) {
      this._hideInputError(inputElement);
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // Переключение submit
  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasValidInput(inputList)) {
      this._enableSubmitButton(buttonElement);
    } else {
      this._disableSubmitButton(buttonElement);
    }
  };

  // Включение submit
  _enableSubmitButton = (buttonElement) => {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disabled = '';
  };
  // отключение submit
  _disableSubmitButton = (buttonElement) => {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = 'disabled';
  };

  // Очистка инпутов
  clearFormInput = () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
      input.value = '';
    });
  };

  // Очистка ошибок валидации
  clearValidation = () => {
    const  errorsSpan = document.querySelectorAll('.popup__error');
    errorsSpan.forEach((error) => error.classList.remove('popup__error_visible'));
    const errorsInput = document.querySelectorAll('input');
    errorsInput.forEach((error) => error.classList.remove('popup__input_type_error'));
  };

  // Отображение ошибки
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this._inputErrorClass);
  };

  // Скрытие ошибки
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // Добавление обработчиков
  _setEventListeners = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    this._formElement.addEventListener('reset', () => {
      this._toggleButtonState(inputList, buttonElement);
    });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation = () => {
    this._formElement.addEventListener('submit', (e) => e.preventDefault());
    this._setEventListeners();
  };
}

export { FormValidator };
